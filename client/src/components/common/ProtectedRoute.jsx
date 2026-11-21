import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { pathname, search, hash } = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: { pathname, search, hash } }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
