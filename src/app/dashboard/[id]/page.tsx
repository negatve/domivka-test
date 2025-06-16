import { PrismaClient } from '@prisma/client';
import ProfileClient from '@/app/components/ProfileClient';

const prisma = new PrismaClient();

export default async function ProfilePage(props: { params: { id: string } }) {
  // Додаємо await на випадок, якщо params — проміс
  const params = await props.params;
  const userId = Number(params.id);

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