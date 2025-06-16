// app/components/ListingFormCreate/index.tsx
'use client';

import React, { useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import { title } from "process";
import { type } from "os";

const ListingFormCreate: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    dealType: "",
    location: "",
    price: "",
    imageLinks: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const imageUrls = formData.imageLinks
        .split(/,|\n/)
        .map(link => link.trim())
        .filter(Boolean);

      const res = await fetch('/api/listings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          dealType: formData.dealType,
          location: formData.location,
          price: formData.price,
          images: imageUrls,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Помилка при створенні');
      }
      router.refresh();
    } catch (err: any) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Створити оголошення</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Заголовок:
          <input
            className={styles.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Опис:
          <textarea
            className={styles.textarea}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Тип житла:
          <select
            className={styles.input}
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Оберіть тип</option>
            <option value="будинок">Будинок</option>
            <option value="квартира">Квартира</option>
            <option value="кімната">Кімната</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Тип угоди:
          <select
            className={styles.input}
            name="dealType"
            value={formData.dealType}
            onChange={handleChange}
            required
          >
            <option value="">Оберіть тип угоди</option>
            <option value="оренда">Оренда</option>
            <option value="купівля">Купівля</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Адреса/Місто:
          <input
            className={styles.input}
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Ціна:
          <input
            className={styles.input}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Посилання на фото (через кому або з нового рядка):
          <textarea
            className={styles.textarea}
            name="imageLinks"
            value={formData.imageLinks}
            onChange={handleChange}
            placeholder="https://site.com/img1.jpg, https://site.com/img2.jpg"
          />
        </label>
      </div>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Створення..." : "Створити"}
      </button>
    </form>
  );
};

export default ListingFormCreate;
