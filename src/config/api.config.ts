import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Platform } from 'react-native'

const getApiUrl = () => {
    if (__DEV__) {
        if (Platform.OS === 'android') {
            return 'http://10.0.2.2:3000' // local dev
        }

        return 'http://127.0.0.1:3000' // default fallback 
    }
}

export const API_BASE_URL = getApiUrl()

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export function setAuthToken(token: string | null) {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    else {
        delete api.defaults.headers.common.Authorization
    }
}

api.interceptors.request.use(
    async (config) => {
        // if the Authorization header is not set, try to get the token from AsyncStorage
        if (!config.headers.Authorization) {
            const token = await AsyncStorage.getItem('@auth_tokens')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
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