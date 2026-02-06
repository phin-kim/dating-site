import LoveAuthForm from './components/Auth';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { useAuthStore } from './Store/authStore';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
function App() {
    useEffect(() => {
        const tryRefresh = async () => {
            await useAuthStore.getState().refresh();
        };
        tryRefresh();
    }, []);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="/login" element={<LoveAuthForm />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
