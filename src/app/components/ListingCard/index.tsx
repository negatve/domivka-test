// app/components/ListingCard.tsx
import React from 'react';
import styles from './index.module.css'

interface ListingCardProps {
  listing: {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    type: string;
    dealType: string;
    createdAt: string;
    images: { url: string }[];
    user: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className={styles.card}>
      <div className={styles.images}>
        {listing.images.map((img, idx) => (
          <img key={idx} src={img.url} alt={`Фото ${idx + 1}`} className={styles.image} />
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>{listing.title}</h2>
          <div className={styles.author}>
            👤 <strong>{listing.user.name}</strong>
            <span className={styles.authorEmail}>({listing.user.email})</span>
            {listing.user.phone && (
              <div className={styles.authorPhone}>
                📞 {listing.user.phone}
              </div>
            )}
          </div>
        </div>
        <p className={styles.description}>{listing.description}</p>
        <div className={styles.meta}>
          <span>🏠 {listing.type}</span>
          <span> · 📄 {listing.dealType}</span>
        </div>
        <p className={styles.location}>📍 {listing.location}</p>
        <p className={styles.price}>💵 {listing.price.toLocaleString()} грн</p>
        <p className={styles.createdAt}>🕒 {new Date(listing.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ListingCard;
