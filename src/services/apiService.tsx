import axios from "axios";

const API_URL = "";

const apiService = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

apiService.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            return Promise.reject(error.response)
        } else
            return Promise.reject(error);
    })

export default apiService;