// src/lib/auth.ts
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export function getUserFromToken() {
  const token = cookies().get('token')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, 'secret') as { email: string }
    return decoded
  } catch {
    return null
  }
}
