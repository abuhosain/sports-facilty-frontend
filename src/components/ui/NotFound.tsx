 

import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from '@ant-design/icons';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <FrownOutlined className="text-9xl text-red-500 mb-4" />
      <h1 className="text-5xl font-bold text-red-500 mb-2">404 - Page Not Found</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Button
        type="primary"
        size="large"
        onClick={handleGoHome}
        className="bg-blue-500 hover:bg-blue-600"
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
