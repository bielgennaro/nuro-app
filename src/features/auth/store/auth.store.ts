import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User } from '../../../models/User'
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  tokens: string | null
  isHydrated: boolean

  setAuth: (user: User, tokens: string) => Promise<void>
  logout: () => Promise<void>
  rehydrate: () => Promise<void>
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  tokens: null,
  isHydrated: false,

  setAuth: async (user, tokens) => {
    set({ user, tokens })
    try {
      await AsyncStorage.setItem('@auth_user', JSON.stringify(user))
      await AsyncStorage.setItem('@auth_tokens', tokens)
    } catch (error) {
      console.error('Error saving auth data:', error)
    }
  },

  logout: async () => {
    set({ user: null, tokens: null })
    try {
      await AsyncStorage.removeItem('@auth_user')
      await AsyncStorage.removeItem('@auth_tokens')
    } catch (error) {
      console.error('Error clearing auth data:', error)
    }
  },

  rehydrate: async () => {
    console.log('🔄 Starting auth store rehydration...')
    try {
      const userData = await AsyncStorage.getItem('@auth_user')
      const tokens = await AsyncStorage.getItem('@auth_tokens')

      console.log('📱 Retrieved from storage - user:', !!userData, 'tokens:', !!tokens)

      if (userData && tokens) {
        const user: User = JSON.parse(userData)
        console.log('✅ User found, setting authenticated state')
        set({ user, tokens, isHydrated: true })
      } else {
        console.log('❌ No user found, setting unauthenticated state')
        set({ user: null, tokens: null, isHydrated: true })
      }
    } catch (error) {
      console.error('❗ Error rehydrating auth store:', error)
      set({ user: null, tokens: null, isHydrated: true })
    }
  },
}))
