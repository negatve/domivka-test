'use client'

import { useEffect, useState } from 'react'
import Header from '@/ui/header'
import HeaderUsers from '@/ui/headeruser'

export default function HeaderSwitcher() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  const checkAuth = () => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setIsAuth(!!data.user))
      .catch(() => setIsAuth(false))
  }

  useEffect(() => {
    checkAuth()
    const onAuthChanged = () => checkAuth()
    window.addEventListener('authChanged', onAuthChanged)
    return () => {
      window.removeEventListener('authChanged', onAuthChanged)
    }
  }, [])

  // Тимчасово показати стандартний Header поки не визначено статус
  if (isAuth === null) return <Header />

  return isAuth ? <HeaderUsers /> : <Header />
}
