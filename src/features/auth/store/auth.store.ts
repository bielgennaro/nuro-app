import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import type { User } from '../../../models/User'
import { AuthService } from '../services/auth.service'
import type { LoginInput } from '../schemas/login.schema'

interface AuthStore {
    user: User | null
    tokens: string | null
    isHydrated: boolean
    isLoading: boolean
    error: string | null

    login: (data: LoginInput) => Promise<void>
    setAuth: (user: User, tokens: string) => Promise<void>
    logout: () => Promise<void>
    rehydrate: () => Promise<void>
}

export const useAuthStore = create<AuthStore>(set => ({
    user: null,
    tokens: null,
    isHydrated: false,
    isLoading: false,
    error: null,

    login: async (data) => {
        set({ isLoading: true, error: null })
        try {
            const response = await AuthService.login(data)
            await set({ user: response.user, tokens: response.token })

            await AsyncStorage.setItem('@auth_user', JSON.stringify(response.user))
            await AsyncStorage.setItem('@auth_tokens', response.token)

            set({ isLoading: false })
        }
        catch (error: any) {
            set({ isLoading: false, error: error.message || 'Erro ao realizar login' })
            throw error
        }
    },

    setAuth: async (user, tokens) => {
        set({ user, tokens })
        try {
            await AsyncStorage.setItem('@auth_user', JSON.stringify(user))
            await AsyncStorage.setItem('@auth_tokens', tokens)
        }
        catch (error) {
            console.error('Error saving auth data:', error)
        }
    },

    logout: async () => {
        set({ user: null, tokens: null })
        try {
            await AsyncStorage.removeItem('@auth_user')
            await AsyncStorage.removeItem('@auth_tokens')
        }
        catch (error) {
            console.error('Error clearing auth data:', error)
        }
    },

    rehydrate: async () => {
        try {
            const userData = await AsyncStorage.getItem('@auth_user')
            const tokens = await AsyncStorage.getItem('@auth_tokens')

            //DEBUG ONLY
            // console.log('📱 Retrieved from storage - user:', !!userData, 'tokens:', !!tokens)

            if (userData && tokens) {
                const user: User = JSON.parse(userData)
                set({ user, tokens, isHydrated: true })
            }
            else {
                set({ user: null, tokens: null, isHydrated: true })
            }
        }
        catch (error) {
            set({ user: null, tokens: null, isHydrated: true })
        }
    },
}))
