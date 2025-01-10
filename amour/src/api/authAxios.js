import axios from 'axios';

const authAxios = axios.create({
    baseURL: 'https://food-service-backend-production.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
authAxios.interceptors.request.use(  // Changed from api to authAxios
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
authAxios.interceptors.response.use(
    (response) => {
        console.log('Auth Response:', response);
        return response;
    },
    (error) => {
        console.error('Auth Response Error:', error.response || error);
        return Promise.reject(error);
    }
);

export const register = async (userData) => {
    try {
        const response = await authAxios.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const login = async (credentials) => {
    try {
        const response = await authAxios.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default authAxios;