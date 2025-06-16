// app/components/ContactForm/index.tsx
'use client'

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch("/api/me")
        .then(res => res.json())
        .then(data => {
            if (data.user) {
            setName(data.user.username || "");
            setEmail(data.user.email || "");
            }
        })
        .catch(() => {});
    }, []);

    return (
      // Форма
      <div className={styles.formWrapper}>
        <form className={styles.formGrid}>
          {/* Ряд 1 */}
          <div>
            <label className={styles.label}>Мета звернення*</label>
            <select className={styles.select} required>
              <option>Оберіть мету…</option>
              <option>Купити квартиру</option>
              <option>Орендувати квартиру</option>
              <option>Продати квартиру</option>
              <option>Здати квартиру в оренду</option>
              <option>Інше</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>Ваша роль*</label>
            <select className={styles.select} required>
              <option>Оберіть варіант…</option>
              <option>Покупець</option>
              <option>Орендар</option>
              <option>Власник квартири</option>
              <option>Рієлтор / Агентство</option>
            </select>
          </div>

          {/* Ряд 2 */}
          <div>
            <label className={styles.label}>Ваше ім’я*</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Введіть ваше ім’я…"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div>
            <label className={styles.label}>Електронна пошта*</label>
            <input
              type="email"
              className={styles.input}
              placeholder="Введіть вашу електронну пошту…"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Ряд 3 */}
          <div>
            <label className={styles.label}>Організація</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Введіть назву організації…"
            />
          </div>
          <div>
            <label className={styles.label}>Телефон</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="Введіть номер телефону…"
            />
          </div>

          {/* Ряд 4 */}
          <div className={`${styles.fullWidth}`}>
            <label className={styles.label}>Повідомлення</label>
            <textarea
              className={styles.textarea}
              placeholder="Введіть ваше повідомлення…"
            />
          </div>

          {/* Кнопка */}
          <div className={styles.buttonWrapper}>
            <button
              type="submit"
              className={styles.button}
            >
              Надіслати →
            </button>
          </div>
        </form>
      </div>
    )
}