 
import { Table, Typography } from 'antd';
import { useGetAllBookingsQuery } from "../../../redux/features/admin/adminManagement.api";

const AdminBooking = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery(undefined);

  // Define columns for the table
  const columns = [
    {
      title: 'User Name',
      dataIndex: ['user', 'name'], 
      key: 'userName',
    },
    {
      title: 'Facility Name',
      dataIndex: ['facility', 'name'], 
      key: 'facilityName',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Payable Amount',
      dataIndex: 'payableAmount',
      key: 'payableAmount',
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
    },
    {
      title: 'Is Booked',
      dataIndex: 'isBooked',
      key: 'isBooked',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
  ];

  if (isLoading) return <Typography.Text>Loading...</Typography.Text>;
  if (isError) return <Typography.Text type="danger">Error loading bookings</Typography.Text>;

  return (
    <div>
      <h1>Admin Booking Management</h1>
      <Table
        dataSource={data?.data || []}  
        columns={columns}
        rowKey="_id"  
        pagination={{ pageSize: 10 }}  
      />
    </div>
  );
};

export default AdminBooking;
