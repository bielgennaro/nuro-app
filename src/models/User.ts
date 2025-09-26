export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  birthDate?: string
  reminderTime?: string
  dailyGoal?: number
  isActive?: boolean
  emailVerified?: boolean
  lastActiveAt?: string
  createdAt: string
  updatedAt: string
}
