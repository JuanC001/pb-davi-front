import axios from "axios";
import { getEnvVariables } from "./getEnvVariables";
const { API_URL } = getEnvVariables();

const conectateApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

conectateApi.interceptors.request.use((config) => {
    const {token} = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};
    console.log(token)
    if (token) {
        config.headers['token'] = token;
    }
    return config;
})

export default conectateApi;