import type { User } from '@/models/User'

interface AuthService {
    login: (email: string, password: string) => Promise<{ user: User, tokens: string }>
    register: (name: string, email: string, password: string) => Promise<{ user: User, tokens: string }>
    verifyEmail: (token: string) => Promise<void>
    resendVerificationEmail: (email: string) => Promise<void>
    requestPasswordReset: (email: string) => Promise<void>
    resetPassword: (token: string, newPassword: string) => Promise<void>
}
