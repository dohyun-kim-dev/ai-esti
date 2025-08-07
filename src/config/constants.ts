export const APP_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  APP_NAME: 'AI Project',
  APP_DESCRIPTION: 'Next.js based AI Project',
  DEFAULT_LANGUAGE: 'ko',
  DEFAULT_THEME: 'light',
} as const
