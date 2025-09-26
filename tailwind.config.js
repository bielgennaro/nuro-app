/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/constants/colors')

module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Primary palette
        'nuro-green': colors.primary,
        'nuro-teal': colors.secondary,
        'nuro-accent': colors.accent,

        // Quick access to main brand colors
        'nuro': colors.primary[500],
        'nuro-light': colors.primary[400],
        'nuro-dark': colors.primary[600],

        // Mood colors for different meditation states
        'mood-calm': colors.moods.calm,
        'mood-focused': colors.moods.focused,
        'mood-anxious': colors.moods.anxious,
        'mood-energized': colors.moods.energized,
        'mood-sleepy': colors.moods.sleepy,

        // Semantic colors
        'success': colors.success,
        'warning': colors.warning,
        'error': colors.error,
        'info': colors.info,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #4ade80, 0 0 20px #4ade80' },
          to: { boxShadow: '0 0 20px #4ade80, 0 0 30px #4ade80' },
        },
      },
    },
  },
  plugins: [],
}
