import axios from "axios";
import { getEnvVariables } from "./getEnvVariables";
const { API_URL } = getEnvVariables();

const conectateApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
//conectateApi.interceptors.request.use((config) => { })

export default conectateApi;