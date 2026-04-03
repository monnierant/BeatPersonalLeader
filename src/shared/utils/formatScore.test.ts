import { describe, it, expect } from 'vitest';
import { formatScore } from './formatScore';

describe('formatScore', () => {
  it('formats a number with locale separators', () => {
    expect(formatScore(616541)).toBe('616,541');
    expect(formatScore(0)).toBe('0');
  });
});
