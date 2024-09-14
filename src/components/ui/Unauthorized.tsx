// src/components/Unauthorized.tsx
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-xl text-gray-700 mb-6">You do not have permission to view this page.</p>
      <Button type="primary" size="large" onClick={handleGoHome} className="bg-blue-500 hover:bg-blue-600">
        Go to Home
      </Button>
    </div>
  );
};

export default Unauthorized;
