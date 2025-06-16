// app/register/page.tsx
'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Паролі не співпадають')
      return
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    if (res.ok) {
      if (res.ok) {
      alert('Успішна реєстрація!')
      window.location.href = '/login' 
    }
    } else {
      const { error } = await res.json()
      alert('Помилка: ' + error)
    }
  }

  return (
  <div className={styles.registerWrapper}>
    <form
      className={styles.registerForm}
      onSubmit={e => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <h1 className={styles.registerTitle}>Реєстрація</h1>
      <input
        className={styles.registerInput}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className={styles.registerInput}
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className={styles.registerInput}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Пароль"
        required
      />
      <input
        className={styles.registerInput}
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Підтвердити пароль"
        required
      />
      <button className={styles.registerButton} type="submit">
        Зареєструватись
      </button>
    </form>
  </div>
)
}
