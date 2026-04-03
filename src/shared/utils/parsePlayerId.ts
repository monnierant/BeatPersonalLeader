import { BEATLEADER_PROFILE_URL_PATTERN } from '../constants';

export const parsePlayerId = (input: string): string | null => {
  const trimmed = input.trim();

  if (/^\d+$/.test(trimmed)) {
    return trimmed;
  }

  const match = BEATLEADER_PROFILE_URL_PATTERN.exec(trimmed);
  return match?.[1] ?? null;
};
