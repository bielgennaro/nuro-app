// src/constants/colors.ts
/**
 * Nuro Design System - Color Tokens
 * Based on Material Design 3.0 principles with biophilic design elements
 * Optimized for WCAG AAA accessibility and reduced cognitive load
 */

export const colors = {
  // Primary Palette - Based on Nuro mascot
  primary: {
    50: '#f0fdf4',   // Whisper green
    100: '#dcfce7',  // Morning dew
    200: '#bbf7d0',  // Soft mint
    300: '#86efac',  // Light sage
    400: '#4ade80',  // Fresh green
    500: '#22c55e',  // Balance green
    600: '#16a34a',  // Forest meditation
    700: '#15803d',  // Deep forest
    800: '#166534',  // Pine shadow
    900: '#14532d',  // Midnight forest
    950: '#052e16',  // Deep earth
  },

  // Nuro Brand Specific
  nuro: {
    primary: '#7EBF87',    // Nuro body color (extracted)
    secondary: '#A4D4AC',  // Nuro light accent
    tertiary: '#5A9C65',   // Nuro shadow
    glow: '#E8FFE8',       // Aura effect
    energy: '#C5F0CC',     // Energy rings
  },

  // Semantic Colors for Mental States
  mood: {
    calm: {
      light: '#E0F2FE',    // Sky meditation
      base: '#7DD3FC',     // Peaceful blue
      dark: '#0284C7',     // Deep calm
      contrast: '#075985', // Focus state
    },
    anxious: {
      light: '#FEE2E2',    // Gentle warning
      base: '#FCA5A5',     // Soft alert
      dark: '#DC2626',     // Critical (rarely used)
      muted: '#F87171',    // Reduced intensity
    },
    focused: {
      light: '#F3E8FF',    // Light purple
      base: '#C084FC',     // ADHD focus purple
      dark: '#9333EA',     // Deep focus
      intense: '#7C3AED',  // Hyperfocus mode
    },
    energized: {
      light: '#FEF3C7',    // Sunrise
      base: '#FCD34D',     // Morning energy
      dark: '#F59E0B',     // Active state
      vibrant: '#FBBF24',  // Celebration
    },
  },

  // Neutral Palette - Reduced contrast for sensory comfort
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },

  // Surface Colors - Glassmorphism ready
  surface: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F4F4F5',
    elevated: 'rgba(255, 255, 255, 0.95)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    glass: {
      light: 'rgba(255, 255, 255, 0.7)',
      medium: 'rgba(255, 255, 255, 0.5)',
      dark: 'rgba(255, 255, 255, 0.3)',
    },
    blur: {
      light: 'rgba(126, 191, 135, 0.1)',  // Nuro tint
      medium: 'rgba(126, 191, 135, 0.2)',
      strong: 'rgba(126, 191, 135, 0.3)',
    },
  },

  // Gradient Definitions - Trending 2025
  gradients: {
    nuroCalm: ['#7EBF87', '#7DD3FC'],      // Primary meditation
    focus: ['#C084FC', '#7C3AED'],         // ADHD focus mode
    sunrise: ['#FCD34D', '#FCA5A5'],       // Morning meditation
    night: ['#6366F1', '#4F46E5'],         // Sleep mode
    aurora: ['#86efac', '#7DD3FC', '#C084FC'], // Premium feature
    breathing: {
      inhale: ['#E0F2FE', '#7DD3FC'],
      hold: ['#7DD3FC', '#7EBF87'],
      exhale: ['#7EBF87', '#E8FFE8'],
    },
  },

  // Functional Colors
  functional: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    premium: '#FFD700',  // Gold for premium features
  },

  // Accessibility Optimized Text
  text: {
    primary: '#18181B',      // WCAG AAA on white
    secondary: '#52525B',    // WCAG AA on white
    tertiary: '#71717A',     // Subtle text
    inverse: '#FFFFFF',      // On dark backgrounds
    muted: '#A1A1AA',        // Disabled state
    link: '#7C3AED',         // Accessible purple
  },

  // Dark Mode Palette (Future implementation)
  dark: {
    background: '#0F1114',
    surface: '#1A1D23',
    elevated: '#23272F',
    border: '#2D3139',
    text: {
      primary: '#F4F4F5',
      secondary: '#A1A1AA',
      tertiary: '#71717A',
    },
  },
} as const;

// Type-safe color getter with opacity
export function color(path: string, opacity?: number): string {
  const keys = path.split('.');
  let current: any = colors;
  
  for (const key of keys) {
    current = current[key];
    if (!current) {
      console.warn(`Color not found: ${path}`);
      return '#000000';
    }
  }
  
  if (opacity && typeof current === 'string' && current.startsWith('#')) {
    const hex = current.replace('#', '');
    const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return `#${hex}${alpha}`;
  }
  
  return current;
}

// Semantic color aliases for components
export const semanticColors = {
  // Backgrounds
  bgPrimary: colors.surface.primary,
  bgSecondary: colors.surface.secondary,
  bgTertiary: colors.surface.tertiary,
  
  // Borders
  borderDefault: colors.neutral[200],
  borderFocus: colors.nuro.primary,
  borderError: colors.functional.error,
  
  // Interactive states
  interactive: {
    default: colors.nuro.primary,
    hover: colors.nuro.secondary,
    pressed: colors.nuro.tertiary,
    disabled: colors.neutral[300],
  },
  
  // Session states
  session: {
    idle: colors.neutral[400],
    active: colors.nuro.primary,
    paused: colors.mood.anxious.muted,
    completed: colors.functional.success,
  },
  
  // Meditation categories
  categories: {
    adhd: colors.mood.focused.base,
    anxiety: colors.mood.calm.base,
    sleep: colors.dark.surface,
    focus: colors.mood.focused.intense,
    stress: colors.mood.calm.dark,
    general: colors.nuro.primary,
  },
} as const;

// Animation color curves for breathing exercises
export const breathingColors = {
  inhale: {
    from: colors.mood.calm.light,
    to: colors.mood.calm.base,
  },
  hold: {
    from: colors.mood.calm.base,
    to: colors.nuro.primary,
  },
  exhale: {
    from: colors.nuro.primary,
    to: colors.nuro.glow,
  },
} as const;

// Export type definitions
export type ColorPath = keyof typeof colors;
export type SemanticColor = keyof typeof semanticColors;
export type MoodColor = keyof typeof colors.mood;
export type GradientName = keyof typeof colors.gradients;