import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../Store/authStore';
import createClientLogger from '../utils/clientLoger';
const log = createClientLogger('COMPONENTS:ProtectedRoutes');
function ProtectedRoutes() {
    const isAuth = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    log.info('Protected routes', {
        data: {
            authState: isAuth,
            loadingState: isLoading,
        },
    });
    if (isLoading) return <p>Loading ...</p>;
    if (!isAuth) return <Navigate to="/login" replace />;
    return <Outlet />;
}

export default ProtectedRoutes;
