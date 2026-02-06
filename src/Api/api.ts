import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import createClientLogger from '../utils/clientLoger';
const log = createClientLogger('API');
const baseURL =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:5000/api'
        : 'backend url';
interface QueuedRequest {
    resolve: (value: string | null) => void;
    reject: (reason?: AxiosError) => void;
    config: InternalAxiosRequestConfig;
}
let failedQueue: QueuedRequest[] = [];

let accessToken: string | null = null;
let isRefreshing = false;
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

//handle expired access token(401)
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as
            | (InternalAxiosRequestConfig & { _retry?: boolean })
            | undefined; //This stores the request that failed.
        if (!originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }
        //skip refresh for endpoint itself
        if (originalRequest.url?.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            originalRequest._retry = true;
            //CASE 1:refresh already in progress
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => resolve(token!),
                        reject,
                        config: originalRequest,
                    });
                })
                    .then((token) => {
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers['Authorization'] =
                            `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((e) => Promise.reject(e));
            }
            //CASE 2: start refresh process
            isRefreshing = true;
            try {
                const refreshRes = await api.post<{ accessToken: string }>(
                    '/auth/refresh'
                );
                const newToken = refreshRes.data.accessToken;
                setAccessToken(newToken); //update global token
                processQueue(null, newToken); //process queued requests

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                log.error('Error in refresh que', { data: refreshError });
                const error = refreshError as AxiosError;
                processQueue(error, null);
                setAccessToken(null); //clear invalid tokens
                // TODO: Implement logout/clear auth state
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);
//setAccess token used by autcontext{zustand}
export function setAccessToken(token: string | null) {
    accessToken = token;
}
const processQueue = (
    error: AxiosError | null,
    token: string | null = null
) => {
    failedQueue.forEach(({ resolve, reject, config }) => {
        if (error) {
            reject(error);
        } else if (token !== null) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
            resolve(token);
        }
    });
    failedQueue = [];
};
/*async function refreshAccessToken(): Promise<string | null> {
    try {
        const response = await api.post('/auth/refresh');
        const newAccessToken = response.data.accessToken as string;
        setAccessToken(newAccessToken);
        return newAccessToken;
    } catch {
        setAccessToken(null);
        return null;
    }
}*/

export default api;
