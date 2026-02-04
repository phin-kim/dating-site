import axios from 'axios';
const baseURL =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:5000/api'
        : 'backedn url';
export const authApi = axios.create({
    baseURL,
    withCredentials: true,
});
authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.code === 'ERR_NETWORK' ||
            error.code === 'ERR_CONNECTION_REFUSED' ||
            error.message === 'Network Error'
        ) {
            return Promise.reject({
                message:
                    'Unable to cnnect to server.Please try again againlater',
                status: 503,
                type: 'NetworkError',
            });
        }
        const message =
            error.response.data?.error.message ||
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Something went wrong please try again';
        return Promise.reject({
            message,
            status: error.response?.status || 500,
            type: error.response?.data?.type || 'Server error',
        });
    }
);
