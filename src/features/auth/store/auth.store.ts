import type { User } from '../../../models/User'
import { MMKV } from 'react-native-mmkv'
import { create } from 'zustand'

const storage = new MMKV({ id: 'auth-storage' })

interface AuthStore {
  user: User | null
  tokens: string | null
  isHydrated: boolean

  setAuth: (user: User, tokens: string) => void
  logout: () => void
  rehydrate: () => void
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  tokens: null,
  isHydrated: false,

  setAuth: (user, tokens) => {
    set({ user, tokens })
    storage.set('user', JSON.stringify(user))
    storage.set('tokens', tokens)
  },

  logout: () => {
    set({ user: null, tokens: null })
    storage.delete('user')
    storage.delete('tokens')
  },

  rehydrate: () => {
    const userData = storage.getString('user')
    const tokens = storage.getString('tokens')

    if (userData && tokens) {
      const user: User = JSON.parse(userData)

      set({ user, tokens, isHydrated: true })
    }

    set({ isHydrated: true })
  },
}))
