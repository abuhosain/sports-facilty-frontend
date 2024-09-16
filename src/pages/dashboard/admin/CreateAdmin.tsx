import React from 'react';
import { Form, Input, Button, Card, Col, Row, Typography, message } from 'antd';
import { useCreateAdminMutation } from '../../../redux/features/admin/adminManagement.api';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CreateAdmin: React.FC = () => {
  const [createAdmin] = useCreateAdminMutation();
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      await createAdmin({ ...values, role: 'admin' }).unwrap();
      message.success('Admin created successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to create admin.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Create Admin</Title>
      <Row gutter={16}>
        {/* Admin Details Column */}
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Card title="Admin Details" bordered={false}>
            <Form form={form} onFinish={handleFinish} layout="vertical">
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter the admin name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="John Doe" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="johndoe@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter a password' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter the phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="1234567890" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter the address' }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="123 Main St, Anytown, USA" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create Admin
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        {/* Preview Column */}
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="Preview" bordered={false}>
            <div style={{ padding: '10px' }}>
              <Typography.Text strong>Name:</Typography.Text> <br />
              <Typography.Text>John Doe</Typography.Text> <br />
              <Typography.Text strong>Email:</Typography.Text> <br />
              <Typography.Text>johndoe@example.com</Typography.Text> <br />
              <Typography.Text strong>Phone:</Typography.Text> <br />
              <Typography.Text>1234567890</Typography.Text> <br />
              <Typography.Text strong>Address:</Typography.Text> <br />
              <Typography.Text>123 Main St, Anytown, USA</Typography.Text> <br />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAdmin;
