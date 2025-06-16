// lib/users.ts (створи цей файл)
type User = { email: string; password: string }

export const users: User[] = []

export function addUser(email: string, password: string): boolean {
  if (users.find(u => u.email === email)) return false
  users.push({ email, password })
  return true
}

export function findUser(email: string, password: string): boolean {
  return users.some(u => u.email === email && u.password === password)
}
