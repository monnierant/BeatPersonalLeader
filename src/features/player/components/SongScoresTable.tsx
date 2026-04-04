import styled from 'styled-components';
import type { PlayerScore } from '../types/player.types';
import { formatAccuracy } from '../../../shared/utils/formatAccuracy';
import { formatDate } from '../../../shared/utils/formatDate';
import { formatScore } from '../../../shared/utils/formatScore';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

const StyledTh = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledTd = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.875rem;
  vertical-align: middle;
`;

const StyledDifficulty = styled.span<{ $difficulty: string }>`
  font-weight: 600;
  font-size: 0.8rem;
  color: ${({ $difficulty, theme }) => {
    const colorMap: Record<string, string> = {
      Easy: theme.colors.difficultyEasy,
      Normal: theme.colors.difficultyNormal,
      Hard: theme.colors.difficultyHard,
      Expert: theme.colors.difficultyExpert,
      ExpertPlus: theme.colors.difficultyExpertPlus,
    };
    return colorMap[$difficulty] ?? theme.colors.textPrimary;
  }};
`;

const StyledFcBadge = styled.span`
  color: ${({ theme }) => theme.colors.success};
  font-weight: 700;
  font-size: 0.8rem;
`;

const StyledModifiers = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface SongScoresTableProps {
  readonly scores: readonly PlayerScore[];
}

export const SongScoresTable = ({ scores }: SongScoresTableProps) => (
  <StyledTable>
    <thead>
      <tr>
        <StyledTh>Difficulty</StyledTh>
        <StyledTh>Accuracy</StyledTh>
        <StyledTh>FC Acc.</StyledTh>
        <StyledTh>Score</StyledTh>
        <StyledTh>Rank</StyledTh>
        <StyledTh>FC</StyledTh>
        <StyledTh>Left / Right</StyledTh>
        <StyledTh>Misses</StyledTh>
        <StyledTh>Bad Cuts</StyledTh>
        <StyledTh>Max Combo</StyledTh>
        <StyledTh>Pauses</StyledTh>
        <StyledTh>Modifiers</StyledTh>
        <StyledTh>Date</StyledTh>
      </tr>
    </thead>
    <tbody>
      {scores.map((score) => (
        <tr key={score.id}>
          <StyledTd>
            <StyledDifficulty $difficulty={score.leaderboard.difficulty.difficultyName}>
              {score.leaderboard.difficulty.difficultyName === 'ExpertPlus'
                ? 'Expert+'
                : score.leaderboard.difficulty.difficultyName}
            </StyledDifficulty>
          </StyledTd>
          <StyledTd>{formatAccuracy(score.accuracy)}</StyledTd>
          <StyledTd>{formatAccuracy(score.fcAccuracy)}</StyledTd>
          <StyledTd>{formatScore(score.baseScore)}</StyledTd>
          <StyledTd>#{score.rank}</StyledTd>
          <StyledTd>
            {score.fullCombo && <StyledFcBadge>FC</StyledFcBadge>}
          </StyledTd>
          <StyledTd>
            {score.accLeft.toFixed(1)} / {score.accRight.toFixed(1)}
          </StyledTd>
          <StyledTd>{score.missedNotes}</StyledTd>
          <StyledTd>{score.badCuts}</StyledTd>
          <StyledTd>{score.maxCombo}</StyledTd>
          <StyledTd>{score.pauses}</StyledTd>
          <StyledTd>
            <StyledModifiers>{score.modifiers || '—'}</StyledModifiers>
          </StyledTd>
          <StyledTd>{formatDate(score.timeset)}</StyledTd>
        </tr>
      ))}
    </tbody>
  </StyledTable>
);
