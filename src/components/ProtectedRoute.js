import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, token }) => {
  return token ? element : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
