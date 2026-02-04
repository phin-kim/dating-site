import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
const baseURL =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:5000/api'
        : 'backend url';

let accessToken: string | null = null;
//setAccess token used by autcontext{zustand}
export function setAccessToken(token: string | null) {
    accessToken = token;
}
//axios instance
const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});
//Attach access token to request
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
//Refresh Token helper
async function refreshAccessToken(): Promise<string | null> {
    try {
        const response = await api.post('/auth/refresh');
        const newAccessToken = response.data.accessToken as string;
        setAccessToken(newAccessToken);
        return newAccessToken;
    } catch {
        setAccessToken(null);
        return null;
    }
}
//handle expired access token(401)
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as
            | (InternalAxiosRequestConfig & { _retry?: boolean })
            | undefined; //This stores the request that failed.
        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            const newToken = await refreshAccessToken();
            if (newToken && originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);
export default api;
