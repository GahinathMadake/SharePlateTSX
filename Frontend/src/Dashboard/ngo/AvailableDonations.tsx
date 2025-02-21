import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Separator } from "@/components/ui/separator";
import { Badge } from '@/components/ui/badge';

// Import Components
import SearchBox from './Listings/SearchBox';
import Card from './Listings/Card';
import Spinner from '@/Animations/Spinner';

const AvailableDonations = () => {
  const [donations, setDonations] = useState([]); // Store fetched donations
  const [loading, setLoading] = useState(true);   // Manage loading state

  useEffect(() => {
    const fetchDonations = async () => {
      console.log("Fetch User Donations");
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_Backend_URL}/api/donations/pending`,
          {withCredentials:true}
        );
        setDonations(response.data);
        console.log("Donations:", response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []); // Runs only once when component mounts


  return (
    <div className='p-4'>
      <div className='p-2 flex justify-between'>
        <h2 className='text-xl font-semibold'>Available Listings</h2>
        <SearchBox />
      </div>

      <Separator />

      <div className='p-3 flex justify-center items-center gap-3'>
        <Badge className='rounded-full text-md'>All</Badge>
        <Badge className='rounded-full text-md'>Near Me</Badge>
        <Badge className='rounded-full text-md'>Connections</Badge>
      </div>

      {loading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div className="my-3 flex gap-3 flex-wrap justify-center items-center">
          {donations.length > 0 ? (
            donations.map((donation, index) => (
              <Card key={index} donation={donation} />
            ))
          ) : (
            <p className="text-gray-500">No donations available.</p>
          )}
        </div>
      )}

      
    </div>
  );
};

export default AvailableDonations;
