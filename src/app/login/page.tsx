// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css' 

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      alert('Невірні дані');
      return;
    }

    const data = await res.json();
    const userId = data?.id; 

    if (userId) {
      localStorage.setItem('authChanged', Date.now().toString());
      window.dispatchEvent(new Event('authChanged'));
      router.push(`/dashboard/${userId}`); // <-- Перехід на профіль
    } else {
      alert('Не вдалося отримати ID користувача');
    }
  }


  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Увійти</h1>
        <input className={styles.loginInput} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className={styles.loginInput} type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
        <button className={styles.loginButton} onClick={handleLogin}>Увійти</button>
      </div>
    </div>
  )
}
