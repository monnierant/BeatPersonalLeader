import { describe, it, expect } from 'vitest';
import { parsePlayerId } from './parsePlayerId';

describe('parsePlayerId', () => {
  it('returns the ID from a plain numeric string', () => {
    expect(parsePlayerId('340247')).toBe('340247');
  });

  it('extracts the ID from a full BeatLeader profile URL', () => {
    expect(parsePlayerId('https://beatleader.com/u/340247')).toBe('340247');
  });

  it('extracts the ID from a URL with a sub-path', () => {
    expect(parsePlayerId('https://beatleader.com/u/340247/scores')).toBe(
      '340247',
    );
    expect(parsePlayerId('https://beatleader.com/u/340247/attempts')).toBe(
      '340247',
    );
  });

  it('handles leading/trailing whitespace', () => {
    expect(parsePlayerId('  340247  ')).toBe('340247');
    expect(parsePlayerId('  https://beatleader.com/u/340247  ')).toBe('340247');
  });

  it('returns null for invalid input', () => {
    expect(parsePlayerId('')).toBeNull();
    expect(parsePlayerId('not-a-url')).toBeNull();
    expect(parsePlayerId('https://google.com')).toBeNull();
  });
});
