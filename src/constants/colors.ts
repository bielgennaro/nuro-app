/**
 * Nuro Design System - Color Tokens
 *
 * Based on the mascot's color palette.
 */

export const colors = {
  // Primary - Based on Nuro's green
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Secondary - Zen blue/teal for meditation
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4', // Light teal from background
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },

  // Accent - Soft yellow/cream for highlights
  accent: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a', // Glow effect
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },

  // Neutral - Grays for text and UI
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Semantic colors
  success: '#10b981', // Emerald
  warning: '#f59e0b', // Amber
  error: '#ef4444', // Red
  info: '#3b82f6', // Blue

  // Meditation mood colors
  moods: {
    calm: '#8b5cf6', // Violet
    focused: '#3b82f6', // Blue
    anxious: '#ec4899', // Pink
    energized: '#f97316', // Orange
    sleepy: '#6366f1', // Indigo
  },

  // Background gradients
  gradients: {
    meditation: ['#5eead4', '#86efac'], // Teal to green
    focus: ['#3b82f6', '#8b5cf6'], // Blue to violet
    sleep: ['#6366f1', '#a78bfa'], // Indigo to purple
    morning: ['#fbbf24', '#f59e0b'], // Yellow gradient
    evening: ['#ec4899', '#8b5cf6'], // Pink to violet
  },

  // Surface colors for cards and containers
  surface: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f5f5f5',
    elevated: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.3)',
  },

  // Text colors with semantic meaning
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#737373',
    disabled: '#a3a3a3',
    inverse: '#ffffff',
    link: '#3b82f6',
  },

  // Border colors
  border: {
    default: '#e5e5e5',
    focus: '#22c55e',
    error: '#ef4444',
    subtle: '#f5f5f5',
  },

  // Shadow colors for elevation
  shadow: {
    sm: 'rgba(0, 0, 0, 0.05)',
    md: 'rgba(0, 0, 0, 0.1)',
    lg: 'rgba(0, 0, 0, 0.15)',
    xl: 'rgba(0, 0, 0, 0.25)',
  },
} as const

export type ColorToken = typeof colors
export type PrimaryColor = keyof typeof colors.primary
export type SecondaryColor = keyof typeof colors.secondary
export type MoodColor = keyof typeof colors.moods

export const tailwindColors = {
  primary: colors.primary,
  secondary: colors.secondary,
  accent: colors.accent,
  ...colors.moods,
} as const

export function getColorValue(path: string): string {
  const keys = path.split('.')
  let value: any = colors

  for (const key of keys) {
    value = value?.[key]
  }

  return value || colors.primary[500]
}

export function withOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '')
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export function timeBasedTheme() {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return {
      gradient: colors.gradients.morning,
      mood: 'energized',
      greeting: 'Bom dia',
    }
  } else if (hour >= 12 && hour < 18) {
    return {
      gradient: colors.gradients.focus,
      mood: 'focused',
      greeting: 'Boa tarde',
    }
  } else if (hour >= 18 && hour < 22) {
    return {
      gradient: colors.gradients.evening,
      mood: 'calm',
      greeting: 'Boa noite',
    }
  } else {
    return {
      gradient: colors.gradients.sleep,
      mood: 'sleepy',
      greeting: 'Hora de descansar',
    }
  }
}

export const darkColors = {
  ...colors,
  surface: {
    primary: '#0a0a0a',
    secondary: '#171717',
    tertiary: '#262626',
    elevated: '#171717',
    overlay: 'rgba(255, 255, 255, 0.1)',
    backdrop: 'rgba(0, 0, 0, 0.8)',
  },
  text: {
    primary: '#fafafa',
    secondary: '#d4d4d4',
    tertiary: '#a3a3a3',
    disabled: '#737373',
    inverse: '#171717',
    link: '#60a5fa',
  },
  border: {
    default: '#404040',
    focus: '#4ade80',
    error: '#f87171',
    subtle: '#262626',
  },
} as const

export default colors
