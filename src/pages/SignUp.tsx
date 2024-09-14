import React from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
 
import { Link } from 'react-router-dom';
import { useCreateUserMutation } from '../redux/features/auth/authApi';

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [createAdmin] = useCreateUserMutation();
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      await createAdmin({ ...values, role: 'user' }).unwrap();
      message.success('Account created successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to create account.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</Title>
      <Row justify="center">
        <Col span={12}>
          <Card title="Create Account" bordered={false}>
            <Form form={form} onFinish={handleFinish} layout="vertical">
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
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
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="1234567890" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter your address' }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="123 Main St, Anytown, USA" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
              </Form.Item>
              <Form.Item>
                <div style={{ textAlign: 'center' }}>
                  Already have an account? <Link to="/login">Log in</Link>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
