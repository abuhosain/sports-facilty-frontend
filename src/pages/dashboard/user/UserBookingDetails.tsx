import { useParams } from "react-router-dom";
import { useGetUserBookingbyIdQuery } from "../../../redux/features/admin/userManagement.api";
import { useEffect } from "react";
 
import { Card, Descriptions, Spin, Alert, Divider } from "antd";

const UserBookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetUserBookingbyIdQuery(id);

  useEffect(() => {
    if (error) {
      console.error("Error fetching booking details:", error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message="Error" description="Unable to fetch booking details." type="error" showIcon />
      </div>
    );
  }

  const booking = data?.data;

  return (
    <div className="container mx-auto p-8" style={{ width: "90%" }}>
      <Card
        title="Booking Details"
        bordered={true}
        cover={
          <img
            alt="facility"
            src="https://i.ibb.co.com/yfsGp1r/ground1.jpg"
            className="w-full h-60 mt-2 object-cover"
          />
        }
        style={{ marginBottom: "20px" }}
      >
        <Descriptions bordered column={1}  >
          <Descriptions.Item label="Facility">{booking?.facility?.name}</Descriptions.Item>
          <Descriptions.Item label="Date">{ booking?.date }</Descriptions.Item>
          <Descriptions.Item label="Start Time">{booking?.startTime}</Descriptions.Item>
          <Descriptions.Item label="End Time">{ booking?.endTime}</Descriptions.Item>
          <Descriptions.Item label="Status">{booking?.isBooked ? "Booked" : "Not Booked"}</Descriptions.Item>
          <Descriptions.Item label="Payable Amount">${booking?.payableAmount ?? '0.00'}</Descriptions.Item>
          <Descriptions.Item label="Transaction ID">{booking?.transactionId ?? 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Payment Status">
            {booking?.paymentStatus ?? 'Pending'}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
      </Card>
    </div>
  );
};

export default UserBookingDetails;
