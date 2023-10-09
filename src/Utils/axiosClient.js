import axios from "axios";
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from "./localStorage";

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true,
})
axiosClient.interceptors.request.use(
    async (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${accessToken}`;
        return request;
    }
)
axiosClient.interceptors.response.use(
    async (response) => {
        const data = response.data;
        if (data.status === 'Ok') {
            return data;
        }
        const originalrequest = response.config;
        const statusCode = data.statusCode;
        const error = data.message;
        if (statusCode === 401 && originalrequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refreshToken`) {
            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace('/login', '_self');
            return Promise.reject(error);
        }
        if (statusCode === 401) {
            const response = await axiosClient.get('/auth/refreshToken');
            if (response.status === 'Ok') {
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                originalrequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`;
                return axios(originalrequest);
            }

        }
        return Promise.reject(error);
    }
)
