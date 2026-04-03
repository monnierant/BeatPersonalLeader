import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats a unix timestamp string to a readable date', () => {
    const result = formatDate('1775243785');
    expect(result).toMatch(/\w+ \d{1,2}, \d{4}/);
  });
});
