'use client';
import Link from 'next/link'
import styles from './index.module.css'
import { Logo } from '@/assets/icons/icons'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/pages/rent', label: 'Оренда' },
  { href: '/pages/buy', label: 'Купівля' },
  { href: '/pages/about', label: 'Про нас' },
  { href: '/pages/contact', label: 'Контакти' },
]

export default function HeaderUsers() {
  const [user, setUser] = useState<{id?: number, email?: string; username?: string; balance?: number } | null>(null);
  const router = useRouter();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout');
    localStorage.setItem('authChanged', Date.now().toString());
    window.dispatchEvent(new Event('authChanged'))
    router.push('/');
  }

  const userId = user?.id; // <-- Тепер точно є id

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/" className={styles.header__logoLink}>
          <Logo className={styles.header__logoImage} />
          <span className={styles.header__logoText}>Домівка</span>
        </Link>
      </div>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navList}>
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.header__link} ${pathname === link.href ? styles.active : ''}`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.header__auth}>
        {user && (
          <>
            <Link href={`/dashboard/${userId}`} className={styles.header__profileLink}>
              {user.username}
            </Link>
            <span className={styles.header__balance}>
              Баланс: {user.balance?.toFixed(2)} ₴
            </span>
            <button className={styles.header__logoutButton} onClick={handleLogout}>
              Вийти
            </button>
          </>
        )}
      </div>
    </header>
  );
}
