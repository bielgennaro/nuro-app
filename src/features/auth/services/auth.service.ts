import { api } from '@/config/api.config'
import type { User } from '@/models/User'
import { loginSchema, type LoginInput } from '../schemas/login.schema'

interface LoginResponse {
    user: User
    token: string
}

interface ErrorResponse {
    error: string
    message: string
}

export class AuthService {
    static async login(data: LoginInput): Promise<LoginResponse> {
        const validatedData = loginSchema.parse(data)

        try {
            const response = await api.post<LoginResponse>('/auth/login', validatedData)
            return response.data
        }
        catch (error: any) {
            throw error as ErrorResponse
        }
    }

    // static async register(name: string, email: string, password: string): Promise<{ user: User, token: string }> {
    //     // TODO
    // }

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
