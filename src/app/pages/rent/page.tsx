import React from 'react';
import { getRentListings } from '@/pages/api/listings/rent';
import ListingSearch from '@/app/components/ListingSearch';

const RentHousePage = async () => {
  const listings = await getRentListings();

  return (
    <div>
      <ListingSearch listings={listings} />
    </div>
  );
};

export default RentHousePage;