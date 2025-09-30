import axios from 'axios'

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data)
        }
        return Promise.reject({
            error: 'Network Error',
            message: 'Não foi possível conectar ao servidor',
        })
    },
)