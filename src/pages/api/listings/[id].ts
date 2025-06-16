import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/app/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method !== 'DELETE') return res.status(405).end();

  try {
    // Спочатку видаляємо всі зображення, пов'язані з оголошенням
    await prisma.listingImage.deleteMany({
      where: { listingId: Number(id) }
    });
    // Потім видаляємо саме оголошення
    await prisma.listing.delete({
      where: { id: Number(id) }
    });
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Помилка при видаленні' });
  }
}