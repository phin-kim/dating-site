import LoveAuthForm from './components/Auth';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { useAuthStore } from './Store/authStore';
import LandingPage from './components/Home';
import Dashboard from './components/Dashboard';
//import ProtectedRoutes from './components/ProtectedRoutes';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import ExploreView from './components/ExploreView';
import ProtectedRoutes from './components/ProtectedRoutes';
import ChatArea from './components/ChatArea';
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
                    <Route element={<Navbar />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/explore" element={<ExploreView />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path = "/chat" element={<ChatArea/>}/>
                    </Route>
                    <Route path="/login" element={<LoveAuthForm />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
