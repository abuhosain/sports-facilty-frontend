/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Collapse, Row, Col } from 'antd';
import { useGetAllFacilitiesQuery } from '../redux/features/admin/adminManagement.api';
 

const { Panel } = Collapse;

const FacilityDetails: React.FC = () => {
  const { id } = useParams();
  const { data: facilities, isLoading } = useGetAllFacilitiesQuery(undefined);
  const [facilityDetails, setFacilityDetails] = useState<any>(null);

  // Find the facility by ID when the data is loaded
  useEffect(() => {
    if (facilities?.data) {
      const facility = facilities.data.find((f: any) => f._id === id);
      setFacilityDetails(facility);
    }
  }, [facilities, id]);

  if (isLoading || !facilityDetails) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const { image, name, description, pricePerHour, location } = facilityDetails;

  return (
    <div className="py-10   px-4 lg:px-20">
      {/* Facility Details */}
      <Row gutter={[16, 16]} className="justify-center">
        <Col xs={24} md={12}>
          <img
            src={image || 'https://via.placeholder.com/300'}
            alt={name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{name}</h2>
              <p className="text-lg text-gray-600 mb-2">{description}</p>
              <p className="text-lg text-gray-600 mb-4">Location: {location}</p>
              <p className="text-xl text-blue-600 font-bold">Price per hour: ${pricePerHour}</p>
            </div>
            <Link to={`/bookings/${id}`}> <Button
              type="primary"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg py-2 mt-6"
              block
            >
              Book Now
            </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Additional Information in Collapse */}
      <div className="mt-10">
        <Collapse accordion>
          <Panel header="Facility Amenities" key="1">
            <p>
              Our facility offers a wide range of amenities including free parking, 
              fully equipped locker rooms with showers, and a comfortable lounge area 
              where you can relax before or after your game. We also have a café on-site 
              offering refreshments and light snacks.
            </p>
            <p>
              Additional features include Wi-Fi access, seating for spectators, and 
              climate control to ensure comfort in all weather conditions.
            </p>
          </Panel>
          <Panel header="Booking Terms & Conditions" key="2">
            <p>
              When booking a facility, please ensure you do so at least 24 hours in 
              advance. Cancellations must be made no less than 12 hours prior to your 
              booking time, or a cancellation fee will apply.
            </p>
            <p>
              Please respect the rules of the facility, including no smoking, no alcohol, 
              and appropriate sports attire at all times. We reserve the right to refuse 
              service to anyone not adhering to these rules.
            </p>
            <p>
              Payments must be made in full prior to your booking. Failure to do so may 
              result in your booking being canceled.
            </p>
          </Panel>
          <Panel header="Reviews" key="3">
            <p>
              <strong>John Doe:</strong> "Had a fantastic time at this facility. 
              The staff were friendly, and the amenities were top-notch!"
            </p>
            <p>
              <strong>Jane Smith:</strong> "Clean and well-maintained. I will 
              definitely be booking again in the future."
            </p>
            <p>
              <strong>David Lee:</strong> "A great experience, though the booking 
              system could be a little more intuitive. Otherwise, fantastic!"
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default FacilityDetails;
