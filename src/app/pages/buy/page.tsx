// pages/app/rent/page.tsx

import React from 'react';
import { getBuyListings } from '@/pages/api/listings/buy';
import ListingSearch from '@/app/components/ListingSearch';

const RentHousePage = async () => {
  const listings = await getBuyListings();

  return (
    <div>
      <ListingSearch listings={listings} />
    </div>
  );
};

export default RentHousePage;