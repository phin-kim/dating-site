import { Navigate } from 'react-router';
import { useAuthStore } from '../Store/authStore';
function ProtectedRoutes({ children }: { children?: React.ReactNode }) {
    const isAuth = useAuthStore((state) => state.isAuthenticated);
    if (!isAuth) return <Navigate to="/login" replace />;
    return <>{children}</>;
}
export default ProtectedRoutes;
