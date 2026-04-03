import styled from 'styled-components';
import type { PlayerScoreStats } from '../types/player.types';
import { formatAccuracy } from '../../../shared/utils/formatAccuracy';
import { formatScore } from '../../../shared/utils/formatScore';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StyledCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const StyledLabel = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledValue = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

interface StatCardsProps {
  readonly stats: PlayerScoreStats;
}

const formatPlaytime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export const StatCards = ({ stats }: StatCardsProps) => {
  const cards = [
    { label: 'Total Plays', value: formatScore(stats.totalPlayCount) },
    { label: 'Ranked Plays', value: formatScore(stats.rankedPlayCount) },
    { label: 'Unranked Plays', value: formatScore(stats.unrankedPlayCount) },
    { label: 'Avg Accuracy', value: formatAccuracy(stats.averageAccuracy) },
    {
      label: 'Avg Ranked Acc',
      value: formatAccuracy(stats.averageRankedAccuracy),
    },
    {
      label: 'Avg Unranked Acc',
      value: formatAccuracy(stats.averageUnrankedAccuracy),
    },
    { label: 'Top Accuracy', value: formatAccuracy(stats.topAccuracy) },
    { label: 'Total Score', value: formatScore(stats.totalScore) },
    { label: 'Playtime', value: formatPlaytime(stats.scorePlaytime) },
    { label: 'Max Streak', value: String(stats.maxStreak) },
  ];

  return (
    <StyledGrid>
      {cards.map((card) => (
        <StyledCard key={card.label}>
          <StyledLabel>{card.label}</StyledLabel>
          <StyledValue>{card.value}</StyledValue>
        </StyledCard>
      ))}
    </StyledGrid>
  );
};
