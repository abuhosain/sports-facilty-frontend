/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCreateUserMutation } from '../redux/features/auth/authApi';

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
    <div className="flex justify-center items-center h-[80vh] bg-gray-100">
      <div className="w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="John Doe"
                className="py-2 px-4 border rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="johndoe@example.com"
                className="py-2 px-4 border rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                className="py-2 px-4 border rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="1234567890"
                className="py-2 px-4 border rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input
                prefix={<HomeOutlined className="text-gray-400" />}
                placeholder="123 Main St, Anytown, USA"
                className="py-2 px-4 border rounded-md"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <div className="text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
