'use client';

import { useState } from 'react';
import styles from './index.module.css';
import { FiPlus } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import Modal from "@/app/components/Modal";
import ListingFormCreate from "@/app/components/ListingFormCreate";
import UserListing from "@/app/components/UserListing";

export default function ProfileClient({ user }: { user: any }) {
  const [openModal, setOpenModal] = useState(false);
  const [listings, setListings] = useState(user.listings);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
  });
  const [saving, setSaving] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm('Ви впевнені, що хочете видалити це оголошення?')) return;
    const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setListings(listings.filter((l: any) => l.id !== id));
    } else {
      alert('Помилка при видаленні');
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Помилка при збереженні');
      setEditMode(false);
      // Оновити дані на сторінці (можна додати setUser, якщо потрібно)
    } catch (e) {
      alert('Помилка при збереженні');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.columns}>
        <div className={styles.leftColumn}>
          <div className={styles.section}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar}>
                {editData.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.profileName}>
                  {editMode ? (
                    <input
                      name="username"
                      value={editData.username}
                      onChange={handleEditChange}
                      className={styles.input}
                    />
                  ) : (
                    editData.username
                  )}
                </div>
                <div className={styles.profileRole}>Користувач</div>
                <div className={styles.profileLocation}>Україна</div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Персональна інформація</div>
              {!editMode ? (
                <button className={styles.editBtn} onClick={() => setEditMode(true)}>
                  <span style={{ fontSize: 18 }}>✎</span>
                </button>
              ) : (
                <button className={styles.editBtn} onClick={handleSave} disabled={saving}>
                  {saving ? 'Збереження...' : 'Зберегти'}
                </button>
              )}
            </div>
            <div className={styles.infoGrid}>
              <div>
                <div className={styles.infoLabel}>Ім'я</div>
                {editMode ? (
                  <input
                    name="username"
                    value={editData.username}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.infoValue}>{editData.username}</div>
                )}
              </div>
              <div>
                <div className={styles.infoLabel}>Email</div>
                {editMode ? (
                  <input
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.infoValue}>{editData.email}</div>
                )}
              </div>
              <div>
                <div className={styles.infoLabel}>Номер телефону</div>
                {editMode ? (
                  <input
                    name="phone"
                    type="tel"
                    value={editData.phone}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.infoValue}>{editData.phone}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Ваші оголошення</div>
              <div className={styles.buttons}>
                <button
                  className={styles.editBtn}
                  onClick={() => setOpenModal(true)}
                >
                  <FiPlus style={{ marginRight: 6 }} />
                  Додати нове
                </button>
              </div>
            </div>
            {listings.length > 0 ? (
              listings.map((listing: any) => (
                <div key={listing.id} style={{ position: "relative" }}>
                  <UserListing
                    title={listing.title}
                    description={listing.description}
                    price={listing.price}
                    type={listing.type === 'оренда' ? 'Оренда' : 'Продаж'}
                    imageUrl={listing.images[0]?.url}
                    location={listing.location}
                  />
                  <button
                    className={styles.deleteBtn}
                    style={{ position: "absolute", top: 12, right: 12 }}
                    onClick={() => handleDelete(listing.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            ) : (
              <p>У вас ще немає жодного оголошення.</p>
            )}
          </div>
        </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ListingFormCreate />
        </Modal>
      </div>
    </div>
  );
}