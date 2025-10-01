import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(3, { error: 'Name must have at least 3 characters' }),
    email: z.email({ error: 'Invalid email address' }),
    password: z.string().min(6, { error: 'Password must have at least 6 characters' }),
})

export type RegisterInput = z.infer<typeof registerSchema>
