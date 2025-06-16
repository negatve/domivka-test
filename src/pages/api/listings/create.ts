import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { prisma } from '@/app/lib/prisma';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // дозволяє великі запити з base64-зображеннями, якщо потрібно
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Метод не дозволено' });

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) return res.status(401).json({ message: 'Неавторизовано' });

  try {
    const decoded = jwt.verify(token, 'secret') as { email: string };

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) return res.status(401).json({ message: 'Користувача не знайдено' });

    const { title, description, type, dealType, location, price, images } = req.body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        type,
        dealType,
        location,
        price: parseFloat(price),
        userId: user.id,
        images: {
          create: images.map((url: string) => ({ url })),
        },
      },
    });

    return res.status(200).json({ message: 'Оголошення створено', listing });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
}
