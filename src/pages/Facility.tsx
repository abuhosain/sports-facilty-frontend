import React, { useState, useEffect } from 'react';
import { Input, Row, Col } from 'antd';
import { useGetAllFacilitiesQuery } from '../redux/features/admin/adminManagement.api';
import { Link } from 'react-router-dom';

const { Search } = Input;

const Facility: React.FC = () => {
  const { data: facilities, isLoading } = useGetAllFacilitiesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFacilities, setFilteredFacilities] = useState<any[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0); // Default min price
  const [maxPrice, setMaxPrice] = useState<number>(1000); // Default max price

  useEffect(() => {
    // If facilities are loaded, dynamically set the max price based on facility data
    if (facilities?.data?.length) {
      const maxFacilityPrice =  10000;
      setMaxPrice(maxFacilityPrice);
    }
  }, [facilities]);

  // Handle search input (facility name or location)
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterFacilities(value, minPrice, maxPrice);
  };

  // Handle price range filtering
  const handlePriceChange = () => {
    filterFacilities(searchTerm, minPrice, maxPrice);
  };

  // Filtering function (both search and price range)
  const filterFacilities = (searchValue: string, minPrice: number, maxPrice: number) => {
    const filteredData = facilities?.data?.filter(
      (facility: any) =>
        (facility.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          facility.location.toLowerCase().includes(searchValue.toLowerCase())) &&
        facility.pricePerHour >= minPrice &&
        facility.pricePerHour <= maxPrice
    );
    setFilteredFacilities(filteredData);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const displayFacilities = searchTerm || minPrice !== 0 || maxPrice !== 10000 ? filteredFacilities : facilities?.data;

  return (
    <div className="py-10 px-4 lg:px-20">
      {/* Heading with title and description */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-3">Our Facilities</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of sports facilities, available for booking at convenient locations and affordable prices.
        </p>
      </div>

      {/* Search and Price Filter */}
      <div className="mb-8 flex flex-col lg:flex-row justify-center gap-4">
        {/* Search Facility by name or location */}
        <Search
          placeholder="Search by facility name or location"
          onSearch={handleSearch}
          enterButton
          className="w-full max-w-lg"
        />

        {/* Filter by Price Range with Input */}
        <div className="flex justify-center  items-center gap-4 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Min Price:</span>
            <Input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              onBlur={handlePriceChange}
              style={{ width: '100px' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Max Price:</span>
            <Input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              onBlur={handlePriceChange}
              style={{ width: '100px' }}
            />
          </div>
        </div>
      </div>

      {/* Facility Grid */}
      <Row gutter={[16, 16]} className=" ">
        {displayFacilities?.map((facility: any) => (
          <Col xs={24} sm={12} md={8} lg={6} key={facility._id}>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <img
                src={facility?.image || 'https://via.placeholder.com/300'}
                alt={facility?.name}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {facility?.name} - ${facility?.pricePerHour}/hour
                </h3>
                <p className="text-gray-600 mb-4">{facility?.description || 'No description available'}</p>
                <Link to={`/facility/${facility?._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">View Details</button>
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Facility;
