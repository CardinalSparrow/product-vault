export const Colors = {
  // Brand
  ink: '#0D0D0D',
  inkLight: '#1A1A2E',
  accent: '#FF4D00',       // Burnt orange — striking, memorable
  accentMuted: '#FF4D001A',
  accentDim: '#CC3D00',

  // Surfaces
  surface: '#FFFFFF',
  surfaceAlt: '#F7F5F2',   // Warm off-white
  surfaceCard: '#FAFAF8',
  border: '#E8E4DE',
  borderFocus: '#FF4D00',

  // Text
  textPrimary: '#0D0D0D',
  textSecondary: '#6B6460',
  textDisabled: '#B5AFA9',
  textInverse: '#FFFFFF',

  // Semantic
  error: '#D93025',
  errorBg: '#FFF0EF',
  success: '#1A7F4B',
  successBg: '#EDF7F2',

  // Limit bar
  limitLow: '#1A7F4B',
  limitMid: '#E07B00',
  limitHigh: '#D93025',
};

export const Typography = {
  // Display / headings — editorial feel
  displayFont: 'serif',     // System serif, feels editorial
  bodyFont: 'System',

  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 30,
    '3xl': 38,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const Radii = {
  sm: 6,
  md: 12,
  lg: 18,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  card: {
    shadowColor: '#0D0D0D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    shadowColor: '#FF4D00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
};
