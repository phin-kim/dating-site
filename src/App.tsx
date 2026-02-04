import LoveAuthForm from './components/Auth';
//import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { useAuthStore } from './Store/authStore';
function App() {
    const refresh = useAuthStore((state) => state.refresh);
    useEffect(() => {
        refresh().catch(() => {
            console.log('Not logged in yet');
        });
    }, [refresh]);
    return (
        <>
            <LoveAuthForm />
        </>
    );
}

export default App;
