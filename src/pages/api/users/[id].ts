// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/app/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        email: true,
        username: true,
        balance: true,
        listings: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            type: true,
            dealType: true,
            location: true,
            images: {
              select: { url: true }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Користувача не знайдено' })
    }

    return res.status(200).json(user)
  }

  if (req.method === 'PATCH') {
    try {
      const { username, email, phone } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          username,
          email,
          phone,
        },
        select: {
          id: true,
          email: true,
          username: true,
          phone: true,
        }
      });
      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(500).json({ error: 'Помилка при оновленні користувача' });
    }
  }

  return res.status(405).end()
}
