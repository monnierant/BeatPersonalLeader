import styled from 'styled-components';
import type { PlayerProfile } from '../types/player.types';
import { formatScore } from '../../../shared/utils/formatScore';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

const StyledAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.accent};
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StyledName = styled.h1`
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StyledCountry = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledRankRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const StyledRankValue = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
`;

interface PlayerHeaderProps {
  readonly player: PlayerProfile;
}

export const PlayerHeader = ({ player }: PlayerHeaderProps) => (
  <StyledHeader>
    <StyledAvatar src={player.avatar} alt={`${player.name}'s avatar`} />
    <StyledInfo>
      <StyledName>
        {player.name}
        <StyledCountry>{player.country}</StyledCountry>
      </StyledName>
      <StyledRankRow>
        {player.rank > 0 && (
          <span>
            Global Rank: <StyledRankValue>#{formatScore(player.rank)}</StyledRankValue>
          </span>
        )}
        <span>
          Country Rank: <StyledRankValue>#{formatScore(player.countryRank)}</StyledRankValue>
        </span>
        {player.pp > 0 && (
          <span>
            PP: <StyledRankValue>{formatScore(player.pp)}</StyledRankValue>
          </span>
        )}
        <span>
          Level: <StyledRankValue>{player.level}</StyledRankValue>
        </span>
      </StyledRankRow>
    </StyledInfo>
  </StyledHeader>
);
