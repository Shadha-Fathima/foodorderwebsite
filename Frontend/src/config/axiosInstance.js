import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials:true,

})
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    } ) 
