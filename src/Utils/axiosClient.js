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
        console.log(request);
        return request;
    }
)
axiosClient.interceptors.response.use(
    async (response) => {
        // console.log("response is ", response);
        const data = response.data;
        if (data.status === 'Ok') {
            console.log("Every thing is ok no need to call refresh api, returning data")
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
        if (statusCode === 401 && originalrequest._retry) {
            originalrequest._retry = true;
            console.log("now the access token expired calling refreshtoken api");
            const response = await axios.create({ withCredentials: true }).get('/auth/refreshToken');
            if (response.status === 'Ok') {
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                originalrequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`;
                return axios(originalrequest);
            }

        }
        return Promise.reject(error);
    }
)
