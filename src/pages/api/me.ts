// pages/api/me.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'cookie'
import jwt from 'jsonwebtoken'
import { prisma } from '@/app/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '')
  const token = cookies.token

  if (!token) return res.status(401).json({ user: null })

  try {
    const decoded = jwt.verify(token, 'secret') as { email: string }
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        id: true, 
        email: true,
        username: true,
        balance: true,
        phone: true,
      },
    })

    if (!user) return res.status(401).json({ user: null })

    return res.status(200).json({ user })
  } catch (err) {
    return res.status(401).json({ user: null })
  }
}
