/* eslint-disable @typescript-eslint/no-explicit-any */
// PopularFacility.tsx
import React from 'react';
import { useGetAllFacilitiesQuery } from '../../redux/features/admin/adminManagement.api';
import FacilityCard from '../../components/ui/shared/facility/FacilityCard';
 

const PopularFacility: React.FC = () => {
  const { data: facilities, isLoading } = useGetAllFacilitiesQuery(undefined);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="py-10 px-4 lg:px-20">
      {/* Heading with title and description */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-3">Popular Facilities</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our top-rated sports facilities and learn more about what they offer. 
          Book a facility today and enjoy your favorite sport!
        </p>
      </div>

      {/* Responsive grid system */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {facilities?.data?.map((facility: any) => (
          <FacilityCard
            key={facility._id}
            image={facility.image}
            name={facility.name}
            description={facility.description}
            id={facility._id}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularFacility;
