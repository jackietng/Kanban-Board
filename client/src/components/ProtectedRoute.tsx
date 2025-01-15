import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = Auth.loggedIn();
  console.log('ProtectedRoute - Auth Status:', isLoggedIn); // Debug log

  if (!isLoggedIn) {
    console.log('Not authenticated, redirecting to login'); // Debug log
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;