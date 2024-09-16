import { Table, Typography } from 'antd';
import { useGetAllBookingsQuery } from "../../../redux/features/admin/adminManagement.api";

const { Title, Text } = Typography;

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

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text type="danger">Error loading bookings</Text>;

  return (
    <div style={{ padding: '16px', maxWidth: '100%', boxSizing: 'border-box' }}>
      <Title level={2} style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Admin Booking Management</Title>
      <Table
        dataSource={data?.data || []}  
        columns={columns}
        rowKey="_id"  
        pagination={{ pageSize: 10 }}  
        scroll={{ x: 'max-content' }} // Horizontal scrolling for table
      />
    </div>
  );
};

export default AdminBooking;
