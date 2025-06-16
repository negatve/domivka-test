import React from 'react';
import styles from './index.module.css'; // Імпорт стилів як об'єкт

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>© {new Date().getFullYear()} Домівка. Всі права захищені.</p>
                <nav className={styles.footerNav}>
                    <a href='/pages/about' className={styles.footerLink}>Про нас</a>
                    <a href='/pages/contact' className={styles.footerLink}>Контакти</a>
                    <a href="/privacy" className={styles.footerLink}>Політика конфіденційності</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;