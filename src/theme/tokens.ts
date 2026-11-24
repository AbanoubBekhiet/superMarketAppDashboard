export const colors = {
  primary: '#5C7057',
  onPrimary: '#FFFFFF',
  primaryHover: '#50644B',
  primaryDeep: '#394C35',
  secondary: '#89A482',
  onSecondary: '#0A2009',
  softAccent: '#ACC5A6',
  onSoftAccent: '#1F241F',
  mintSurface: '#D1EDD3',
  onMintSurface: '#092010',
  surface: '#F9FBF9',
  onSurface: '#1F241F',
  onSurfaceMuted: '#434842',
  onSurfaceSubtle: '#5B605A',
  surfaceCard: '#FFFFFF',
  onSurfaceCard: '#1F241F',
  surfaceSubtle: '#EFF1EF',
  outline: '#ACC5A6',
  outlineSubtle: '#DFE4DC',
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',
  warningContainer: '#FEF3C7',
  onWarningContainer: '#451A03',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  section: 24,
  pageX: 16,
} as const;

export const radii = {
  sm: 8,
  default: 12,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const fontFamilies = {
  display: 'Cairo',
  headline: 'Cairo',
  title: 'Cairo',
  body: 'Tajawal',
  label: 'Cairo',
} as const;

export const motion = {
  stateChangeMs: 120,
  surfaceEnterMs: 220,
  surfaceExitMs: 150,
} as const;
