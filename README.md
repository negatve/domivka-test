# Домівка — Веб-сайт для розміщення оголошень про житло

Цей проект — це веб-додаток для розміщення, пошуку та перегляду оголошень про житло, створений на базі [Next.js](https://nextjs.org) з використанням [Prisma ORM](https://www.prisma.io/) та бази даних SQLite.

## Огляд архітектури

```mermaid
flowchart TD
    A[Користувач] 
    A -->|HTTP/HTTPS| B[Next.js Frontend]
    B -->|API/Server Actions| C[Next.js Backend]
    C -->|Prisma ORM| D[Prisma Client]
    D -->|SQL| E[(SQLite Database)]

    subgraph "Frontend (Next.js)"
      B1[Сторінка /dashboard]
      B2[Сторінка /dashboard/[id]]
      B3[Компонент ListingSearch]
      B4[Компонент ListingCard]
      B5[Компонент ProfileClient]
      B1 --> B3
      B3 --> B4
      B2 --> B5
    end

    subgraph "Backend (Next.js API/Server Actions)"
      C1[API: Отримання користувача]
      C2[API: Отримання оголошень]
      C3[API: Додавання оголошення]
      C4[API: Авторизація/реєстрація]
      C1 --> D
      C2 --> D
      C3 --> D
      C4 --> D
    end

    A --> B1
    A --> B2
    B1 --> C2
    B2 --> C1
    B2 --> C2
    B2 --> C3
    B --> C4

    D --> E
```

## Як запустити проект

### 1. Встановлення залежностей

На новому комп'ютері виконайте:

```bash
npm install
# або
yarn install
# або
pnpm install
```

### 2. Налаштування бази даних та Prisma

- Відредагуйте файл `.env` за потреби (наприклад, для зміни шляху до бази даних).
- Ініціалізуйте базу даних та Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Запуск проекту

```bash
npm run dev
# або
yarn dev
# або
pnpm dev
# або
bun dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

## Основні сторінки та компоненти

- `/dashboard` — головна сторінка оголошень
- `/dashboard/[id]` — детальна сторінка оголошення
- `ListingSearch`, `ListingCard`, `ProfileClient` — основні компоненти інтерфейсу

## Додатково

- Для роботи з базою даних використовується Prisma ORM та SQLite.
- Для розгортання можна використовувати [Vercel](https://vercel.com/).

## Корисні посилання

- [Документація Next.js](https://nextjs.org/docs)
- [Документація Prisma](https://www.prisma.io/docs)
- [Документація Vercel](https://vercel.com/docs)
