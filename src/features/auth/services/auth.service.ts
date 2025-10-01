import { api } from '@/config/api.config'
import type { User } from '@/models/User'
import { loginSchema, type LoginInput } from '../schemas/login.schema'
import { registerSchema, type RegisterInput } from '../schemas/register.schema'

interface LoginResponse {
    user: User
    token: string
}

interface RegisterResponse {
    user: User
    token: string
}

interface MeResponse {
    user: User
}

interface ErrorResponse {
    error: string
    message: string
}

export class AuthService {
    static async login(data: LoginInput): Promise<LoginResponse> {
        try {
            const validatedData = loginSchema.parse(data)
            const response = await api.post<LoginResponse>('/auth/login', validatedData)
            return response.data
        }
        catch (error: any) {
            console.error('[AuthService] Login - Erro:', error)
            throw error
        }
    }

    static async register(data: RegisterInput): Promise<RegisterResponse> {
        try {
            const validatedData = registerSchema.parse(data)

            const response = await api.post<RegisterResponse>('/auth/register', validatedData)
            return response.data
        }
        catch (error: any) {
            console.error('[AuthService] Register - Erro:', error)
            throw error
        }
    }

    static async getMe(): Promise<User> {
        try {
            const response = await api.get<MeResponse>('/auth/me')
            return response.data.user
        }
        catch (error: any) {
            console.error('[AuthService] GetMe - Erro:', error)
            throw error
        }
    }

    // static async verifyEmail(token: string): Promise<void> {
    //     // TODO
    // }

    // static async resendVerificationEmail(email: string): Promise<void> {
    //     // TODO
    // }

    // static async requestPasswordReset(email: string): Promise<void> {
    //     // TODO
    // }

    // static async resetPassword(token: string, newPassword: string): Promise<void> {
    //     // TODO
    // }
}
