// pages/api/listings/buy.ts
'use server';

import { prisma } from '@/app/lib/prisma';

export const getBuyListings = async () => {
  return await prisma.listing.findMany({
    where: {
      dealType: 'купівля',
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
