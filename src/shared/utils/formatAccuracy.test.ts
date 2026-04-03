import { describe, it, expect } from 'vitest';
import { formatAccuracy } from './formatAccuracy';

describe('formatAccuracy', () => {
  it('formats accuracy as a percentage string', () => {
    expect(formatAccuracy(0.6840764)).toBe('68.41%');
    expect(formatAccuracy(0.9999)).toBe('99.99%');
    expect(formatAccuracy(1)).toBe('100.00%');
    expect(formatAccuracy(0)).toBe('0.00%');
  });
});
