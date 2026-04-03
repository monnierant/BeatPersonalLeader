export const theme = {
  colors: {
    backgroundPrimary: '#1a1a2e',
    backgroundCard: '#16213e',
    backgroundInput: '#0f1729',
    accent: '#e94560',
    accentHover: '#d63350',
    textPrimary: '#eaeaea',
    textSecondary: '#a0a0b0',
    border: '#2a2a4a',
    success: '#4ade80',
    difficultyExpertPlus: '#8f48db',
    difficultyExpert: '#bf2a42',
    difficultyHard: '#ff6347',
    difficultyNormal: '#59b0f4',
    difficultyEasy: '#3cb371',
  },
  fonts: {
    primary: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  borderRadius: '8px',
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
} as const;

export type AppTheme = typeof theme;
