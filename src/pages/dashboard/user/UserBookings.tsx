import React, { useState, useEffect } from "react";
import { Table, Button, Space, message } from "antd";
import dayjs from "dayjs";
import { useGetUserBookingQuery, useDeleteUserBookingbyIdMutation } from "../../../redux/features/admin/userManagement.api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserBookings: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserBookingQuery(undefined);
  const [bookings, setBookings] = useState<any[]>([]); // Local state to manage bookings
  const [deleteBooking] = useDeleteUserBookingbyIdMutation();

  // Load bookings into local state when data is available
  useEffect(() => {
    if (data?.data) {
      setBookings(data.data);
    }
  }, [data]);

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error loading bookings.</div>;
  }

  // Define columns for the table
  const columns = [
    {
      title: "Facility",
      dataIndex: "facility",
      key: "facility",
      render: (_: any, record: any) => record.facility?.name,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => dayjs(text).format("MMMM D, YYYY"),
    },
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
    {
      title: "Booking Status",
      dataIndex: "isBooked",
      key: "isBooked",
      render: (isBooked: boolean) => (isBooked ? "Booked" : "Not Booked"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            View Details
          </Button>
          <Button danger onClick={() => handleCancelBooking(record._id)}>
            Cancel Booking
          </Button>
        </Space>
      ),
    },
  ];

  // Handle viewing booking details
  const handleViewDetails = (record: any) => {
    navigate(`${record._id}`);
  };

  // Handle canceling a booking
  const handleCancelBooking = (bookingId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the delete booking mutation
          await deleteBooking(bookingId).unwrap();

          // Update local state to remove the canceled booking from the list
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking._id !== bookingId)
          );

          message.success("Booking canceled successfully.");
        } catch (err) {
          message.error("Error canceling the booking.");
        }
      }
    });
  };

  return (
    <div>
      <h1>Your Bookings</h1>
      <Table columns={columns} dataSource={bookings} rowKey="_id" />
    </div>
  );
};

export default UserBookings;
