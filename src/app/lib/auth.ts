import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getUserFromToken() {
  const cookiesList = await cookies()
  const token = cookiesList.get('token')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, 'secret') as { email: string }
    return decoded
  } catch {
    return null
  }
}
