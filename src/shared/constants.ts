export const BEATLEADER_API_BASE_URL = 'https://api.beatleader.com';

export const CORS_PROXY_URL = 'https://corsproxy.io/?url=';

export const BEATLEADER_PROFILE_URL_PATTERN =
  /beatleader\.com\/u\/(\d+)/;

export const DEFAULT_PAGE_SIZE = 20;

export const DEBOUNCE_DELAY_MS = 300;

export const RECENT_PROFILES_KEY = 'beatPersonalLeader_recentProfiles';
export const MAX_RECENT_PROFILES = 5;

export const DIFFICULTY_LABELS = [
  'Easy',
  'Normal',
  'Hard',
  'Expert',
  'ExpertPlus',
] as const;

export const SORT_OPTIONS = ['date', 'acc'] as const;
export const ORDER_OPTIONS = ['desc', 'asc'] as const;
