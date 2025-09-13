import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  if (!user) {
    // User is not authenticated, redirect to login with a message
    return <Navigate to="/login" state={{ from: location, message: 'Please sign in first.' }} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // User is not an admin, redirect to video list or show unauthorized message
    return <Navigate to="/videos" state={{ from: location, message: 'Unauthorized access.' }} replace />;
  }

  return children;
};

export default PrivateRoute;


