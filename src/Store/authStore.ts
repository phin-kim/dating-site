import { create } from 'zustand';
import api, { setAccessToken } from '../Api/api';
import createClientLogger from '../utils/clientLoger';
import type { User, AuthResponse } from '../../frontendTypes/Auth';
const log = createClientLogger('AUTH STORE');
type AuthState = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;

    register: (
        displayName: string,
        email: string,
        password: string
    ) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
};
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    register: async (displayName, email, password) => {
        const res = await api.post<AuthResponse>('/auth/register', {
            displayName,
            email,
            password,
        });
        setAccessToken(res.data.accessToken);
        set({
            user: res.data.user,
            accessToken: res.data.accessToken,
            isAuthenticated: true,
        });
    },
    login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        setAccessToken(res.data.accessToken);
        set({
            user: res.data.user,
            accessToken: res.data.accessToken,
            isAuthenticated: true,
        });
    },
    refresh: async () => {
        try {
            const res = await api.post('/auth/refresh');
            setAccessToken(res.data.accessToken);
            set({
                user: res.data.user,
                accessToken: res.data.accessToken,
                isAuthenticated: true,
            });
        } catch (error) {
            //refresh failed useer stays logged out
            setAccessToken(null);
            set({
                user: null,
                accessToken: null,
                isAuthenticated: false,
            });
            log.error('Error in refreshing', { data: error });
        }
    },
    logout: async () => {
        await api.post('/auth/logout');
        setAccessToken(null);
        set({ user: null, accessToken: null, isAuthenticated: false });
    },
}));
