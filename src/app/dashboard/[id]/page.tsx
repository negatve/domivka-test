import { PrismaClient } from '@prisma/client';
import ProfileClient from '@/app/components/ProfileClient';

const prisma = new PrismaClient();

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const userId = Number(resolvedParams.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      listings: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!user) return <div>Користувача не знайдено</div>;

  return <ProfileClient user={user} />;
}