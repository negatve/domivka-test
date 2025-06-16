'use client';

import React, { useState } from 'react';
import ListingCard from '@/app/components/ListingCard';

export default function ListingSearch({ listings }: { listings: any[] }) {
  const [search, setSearch] = useState('');

  const filtered = listings.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 400,
          margin: "0 0 24px 0",
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: "1rem"
        }}
      />
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={{
              ...listing,
              createdAt: listing.createdAt instanceof Date
                ? listing.createdAt.toISOString()
                : listing.createdAt,
              images: listing.images.map((img: any) => ({ url: img.url })),
              user: {
                name: listing.user.username,
                email: listing.user.email,
                phone: listing.user.phone,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}