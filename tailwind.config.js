import { colors } from './src/constants/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary palette mapping
        primary: colors.primary,
        
        // Nuro brand colors
        nuro: {
          DEFAULT: colors.nuro.primary,
          light: colors.nuro.glow,
          dark: colors.nuro.tertiary,
          glow: colors.nuro.glow,
          energy: colors.nuro.energy,
        },
        
        // Mood states for mental health UI
        calm: colors.mood.calm,
        anxious: colors.mood.anxious,
        focused: colors.mood.focused,
        energized: colors.mood.energized,
        
        // Neutrals with custom naming
        gray: colors.neutral,
        
        // Semantic colors
        success: colors.functional.success,
        warning: colors.functional.warning,
        error: colors.functional.error,
        info: colors.functional.info,
        premium: colors.functional.premium,
        
        // Surface colors for glassmorphism
        surface: {
          DEFAULT: colors.surface.primary,
          secondary: colors.surface.secondary,
          tertiary: colors.surface.tertiary,
          glass: colors.surface.glass.light,
          'glass-medium': colors.surface.glass.medium,
          'glass-dark': colors.surface.glass.dark,
        },
      },
      
      // Modern spacing scale (8px base unit)
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
        '12': '96px',
        '14': '112px',
        '16': '128px',
        '18': '144px',
        '20': '160px',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      
      // Typography system (Fluid Type Scale)
      fontSize: {
        'xxs': ['10px', { lineHeight: '14px' }],
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '38px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
        '5xl': ['48px', { lineHeight: '56px' }],
        'fluid-sm': 'clamp(14px, 3.5vw, 16px)',
        'fluid-base': 'clamp(16px, 4vw, 20px)',
        'fluid-lg': 'clamp(20px, 5vw, 24px)',
        'fluid-xl': 'clamp(24px, 6vw, 32px)',
      },
      
      // Border radius system (Smooth corners trend)
      borderRadius: {
        'none': '0px',
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
        'nuro': '20px', // Brand specific radius
      },
      
      // Shadows (Neumorphic + Traditional)
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'xl': '0 16px 32px rgba(0, 0, 0, 0.12)',
        '2xl': '0 24px 48px rgba(0, 0, 0, 0.14)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'nuro': '0 4px 24px rgba(126, 191, 135, 0.25)',
        'nuro-hover': '0 8px 32px rgba(126, 191, 135, 0.35)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'neomorphic': '8px 8px 16px rgba(0, 0, 0, 0.08), -8px -8px 16px rgba(255, 255, 255, 0.7)',
      },
      
      // Animation durations (Reduced for ADHD)
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 250ms ease-out',
        'slide-down': 'slideDown 250ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathing': 'breathing 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // Backdrop filters for glassmorphism
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      
      // Font families (SF Pro for iOS feel)
      fontFamily: {
        sans: ['System', 'SF Pro Display', 'Helvetica Neue', 'sans-serif'],
        rounded: ['SF Pro Rounded', 'System', 'sans-serif'],
        mono: ['SF Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
