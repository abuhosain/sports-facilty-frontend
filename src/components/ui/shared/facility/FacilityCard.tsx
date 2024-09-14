// FacilityCard.tsx
import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface FacilityCardProps {
  image: string;
  name: string;
  description: string;
  id : string
}

const FacilityCard: React.FC<FacilityCardProps> = ({ image, name, description, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <img
        src={image || 'https://via.placeholder.com/300'}
        alt={name}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description || 'No description available'}</p>
        <Link to={`/facility/${id}`}><Button
          type="primary"
          block
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-lg py-2"
        >
          View Details
        </Button></Link> 
      </div>
    </div>
  );
};

export default FacilityCard;
