import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();
  return allowedRoles?.find(role => role?.includes(auth?.role)) ? (
    <Outlet />
  ) : auth?.uuid ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
