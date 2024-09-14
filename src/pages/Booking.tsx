/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert, Button, DatePicker, Card, Table } from "antd";
import moment from "moment";
import { useGetAllFacilitiesQuery } from "../redux/features/admin/adminManagement.api";
import { useLazyCheckAvailabilityQuery } from "../redux/features/admin/userManagement.api";
import CreateBooking from "../components/ui/shared/booking/CreateBooking";

const Booking: React.FC = () => {
  const { id: facilityId } = useParams<{ id: string }>();
  const [facility, setFacility] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  // Fetch all facilities
  const { data: facilities, isLoading, error } = useGetAllFacilitiesQuery(undefined);

  // Lazy query to check availability
  const [checkAvailability, { data: availabilityData, isLoading: isChecking }] = useLazyCheckAvailabilityQuery();

  // Filter the specific facility by ID
  useEffect(() => {
    if (facilities?.data?.length) {
      const foundFacility = facilities.data.find((facility: any) => facility._id === facilityId);
      setFacility(foundFacility);
    }
  }, [facilities, facilityId]);

  // Handle date change and check availability
  const handleCheckAvailability = () => {
    const date = selectedDate ? selectedDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"); // Use today's date if none selected
    checkAvailability({ facilityId, date }); // Trigger the lazy query
  };

  // Handle date selection
  const onDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
  };

  // Table columns for available slots
  const columns = [
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
  ];

  if (isLoading) {
    return <Spin tip="Loading facility details..." />;
  }

  if (error) {
    return <Alert message="Error loading facility details" type="error" />;
  }

  return (
    <div className="booking-details-container">
      <h2 className="text-2xl font-bold text-center">Booking Details</h2>

      {facility ? (
        <Card
          title={facility.name}
          bordered={false}
          style={{ maxWidth: "800px", margin: "0 auto", marginTop: "20px" }}
        >
          <img
            src={facility.image || "https://via.placeholder.com/300"}
            alt={facility.name}
            className="w-full h-72 object-cover mb-4"
          />
          <p className="text-lg">Price per Hour: ${facility.pricePerHour}</p>
          <p className="text-lg">Location: {facility.location}</p>

          {/* Check Availability Section */}
          <div className="availability-section mt-8">
            <h3 className="text-lg font-bold mb-2">Check Availability</h3>

            {/* Ant Design DatePicker */}
            <DatePicker
              onChange={onDateChange}
              defaultValue={moment()} // Default to today's date
              className="w-full mb-4"
              format="YYYY-MM-DD"
            />

            <Button
              type="primary"
              onClick={handleCheckAvailability}
              disabled={!facilityId} // Disable if no facility is selected
              loading={isChecking}
            >
              {isChecking ? "Checking Availability..." : "Check Availability"}
            </Button>

            {/* Display Available Slots */}
            {availabilityData && availabilityData.success && (
              <div className="mt-4">
                <Alert message="Facility is available on this date." type="success" />
                <Table
                  dataSource={availabilityData.data}
                  columns={columns}
                  pagination={false}
                  rowKey={(record : {startTime : string, endTime : string }) => `${record.startTime}-${record.endTime}`} // Unique row key
                  className="mt-4"
                />
              </div>
            )}

            {availabilityData && !availabilityData.success && (
              <Alert message="Facility is not available on this date." type="error" className="mt-4" />
            )}
          </div>
          <CreateBooking facilityId={`${facilityId}`} />
        </Card>
       
      ) : (
        <p>No facility details found.</p>
      )}
    </div>
  );
};

export default Booking;
