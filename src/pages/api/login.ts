// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Login request:')
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Невірні дані' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).json({ error: 'Невірні дані' })

  const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' })

  res.setHeader('Set-Cookie', serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 3600
  }))

  res.status(200).json({ success: true, id: user.id })
}
