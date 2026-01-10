/**
 * Theme Hook and Provider
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Brand colors from wireframes
export const colors = {
  primary: {
    navy: '#1E3A5F',
    gold: '#C9A227',
  },
  secondary: {
    lightBlue: '#4A90A4',
    cream: '#F5F5DC',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  neutral: {
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
    black: '#000000',
  },
};

export const lightTheme = {
  colors: {
    ...colors,
    background: colors.neutral.white,
    surface: colors.neutral.gray50,
    card: colors.neutral.white,
    text: colors.neutral.gray900,
    textSecondary: colors.neutral.gray600,
    textTertiary: colors.neutral.gray400,
    border: colors.neutral.gray200,
    divider: colors.neutral.gray100,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '600' as const, lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
    h4: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
    button: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...colors,
    background: colors.neutral.gray900,
    surface: colors.neutral.gray800,
    card: colors.neutral.gray800,
    text: colors.neutral.white,
    textSecondary: colors.neutral.gray300,
    textTertiary: colors.neutral.gray500,
    border: colors.neutral.gray700,
    divider: colors.neutral.gray800,
  },
};

export type Theme = typeof lightTheme;

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');

  const isDark =
    themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setThemeMode((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default useTheme;
