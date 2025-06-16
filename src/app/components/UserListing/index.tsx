// app/components/UserListing.tsx

import React from 'react';
import styles from './index.module.css';

type ListingProps = {
  title: string;
  description: string;
  price: number;
  type: String;
  imageUrl: string;
  location: string;
};

function formatPrice(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const UserListing: React.FC<ListingProps> = ({
  title,
  description,
  price,
  type,
  imageUrl,
  location,
}) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.location}>{location}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span>
            {formatPrice(price)} ₴
          </span>
          <span className={styles.type}>{type}</span>
        </div>
      </div>
    </div>
  );
};

export default UserListing;