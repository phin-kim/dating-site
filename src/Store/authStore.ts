import { create } from 'zustand';
import api, { setAccessToken } from '../Api/api';
import createClientLogger from '../utils/clientLoger';
import type { User, AuthResponse } from '../../frontendTypes/Auth';
const log = createClientLogger('AUTH STORE');
type AuthState = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
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
    isLoading: false,
    register: async (displayName, email, password) => {
        set({ isLoading: true });
        try {
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
        } catch (error) {
            log.error('Error in register', { data: error });
            set({ isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    },
    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const res = await api.post('/auth/login', { email, password });
            setAccessToken(res.data.accessToken);
            set({
                user: res.data.user,
                accessToken: res.data.accessToken,
                isAuthenticated: true,
            });
        } catch (error) {
            set({ isAuthenticated: false });
            log.error('Error in login', { data: error });
        } finally {
            set({ isLoading: false });
        }
    },
    refresh: async () => {
        set({ isLoading: true });
        try {
            const res = await api.post('/auth/refresh');
            setAccessToken(res.data.accessToken);
            set({
                user: res.data.user,
                accessToken: res.data.accessToken,
                isAuthenticated: true,
            });
        } catch (error) {
            // refresh failed; user stays logged out
            setAccessToken(null);
            set({
                user: null,
                accessToken: null,
                isAuthenticated: false,
            });
            log.error('Error in refreshing', { data: error });
        } finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        await api.post('/auth/logout');
        setAccessToken(null);
        set({ user: null, accessToken: null, isAuthenticated: false });
    },
}));
