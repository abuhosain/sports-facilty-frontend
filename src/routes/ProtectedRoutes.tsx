/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useCurrentToken } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = useAppSelector(useCurrentToken);
  let user : any;

  if (token) {
    user = verifyToken(token);
  }

  // If no user is logged in or the user's role is not allowed, redirect to login or unauthorized page
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
