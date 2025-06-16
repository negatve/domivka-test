// pages/api/listings/rent.ts
'use server';

import { prisma } from '@/app/lib/prisma';

export const getRentListings = async () => {
  return await prisma.listing.findMany({
    where: {
      dealType: 'оренда',
    },
    include: {
      images: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
