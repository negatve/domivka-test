// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, email, password } = req.body

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) return res.status(400).json({ error: 'Користувач вже існує' })

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: { username, email, password: hashedPassword }
  })

  res.status(200).json({ success: true })
}
