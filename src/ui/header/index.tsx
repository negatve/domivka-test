// src/ui/header

'use client';
import styles from './index.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/assets/icons/icons';

const navLinks = [
  { href: '/pages/rent', label: 'Оренда' },
  { href: '/pages/buy', label: 'Купівля' },
  { href: '/pages/about', label: 'Про нас' },
  { href: '/pages/contact', label: 'Контакти' },
];

export default function Header() {
  const pathname = usePathname();

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
        <Link
          href="/login"
          className={`${styles.header__login} ${pathname === "/login" ? styles.active : ''}`}
        >
          Вхід
        </Link>
        <span className={styles.header__divider}>/</span>
        <Link
          href="/register"
          className={`${styles.header__buttonRegister} ${pathname === "/register" ? styles.active : ''}`}
        >
          Реєстрація
        </Link>
      </div>
    </header>
  );
}