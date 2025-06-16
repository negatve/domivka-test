// src/pages/api/logout.ts
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize('token', '', {
    path: '/', // ВАЖЛИВО: видаляти cookie для всього сайту
    maxAge: -1,
  })

  res.setHeader('Set-Cookie', cookie)
  res.status(200).json({ success: true })
}