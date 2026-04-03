import styled from 'styled-components';
import {
  MAX_RECENT_PROFILES,
  RECENT_PROFILES_KEY,
} from '../../../shared/constants';

const StyledSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StyledTitle = styled.h3`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.9rem;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export interface RecentProfile {
  readonly id: string;
  readonly name: string;
}

export const getRecentProfiles = (): RecentProfile[] => {
  try {
    const data = localStorage.getItem(RECENT_PROFILES_KEY);
    return data ? (JSON.parse(data) as RecentProfile[]) : [];
  } catch {
    return [];
  }
};

export const saveRecentProfile = (profile: RecentProfile): void => {
  const existing = getRecentProfiles().filter((p) => p.id !== profile.id);
  const updated = [profile, ...existing].slice(0, MAX_RECENT_PROFILES);
  localStorage.setItem(RECENT_PROFILES_KEY, JSON.stringify(updated));
};

export const RecentProfiles = () => {
  const profiles = getRecentProfiles();

  if (profiles.length === 0) return null;

  return (
    <StyledSection>
      <StyledTitle>Recent profiles</StyledTitle>
      <StyledList>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <StyledLink href={`#/player/${profile.id}`}>
              {profile.name} ({profile.id})
            </StyledLink>
          </li>
        ))}
      </StyledList>
    </StyledSection>
  );
};
