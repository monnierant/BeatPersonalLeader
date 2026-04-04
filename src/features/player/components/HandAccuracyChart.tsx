import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import styled from 'styled-components';
import type { PlayerScore } from '../types/player.types';
import { theme } from '../../../shared/styles/theme';

const StyledChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.md};
`;

const StyledChartTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LEFT_COLOR = '#e94560';
const RIGHT_COLOR = '#4a9eff';

interface HandAccuracyChartProps {
  readonly scores: readonly PlayerScore[];
}

export const HandAccuracyChart = ({ scores }: HandAccuracyChartProps) => {
  const data = useMemo(
    () =>
      scores.map((s) => ({
        difficulty:
          s.leaderboard.difficulty.difficultyName === 'ExpertPlus'
            ? 'Expert+'
            : s.leaderboard.difficulty.difficultyName,
        left: Number(s.accLeft.toFixed(2)),
        right: Number(s.accRight.toFixed(2)),
      })),
    [scores],
  );

  if (data.length === 0) return null;

  return (
    <StyledChartContainer>
      <StyledChartTitle>Hand Accuracy (per difficulty)</StyledChartTitle>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis dataKey="difficulty" stroke={theme.colors.textSecondary} fontSize={12} />
          <YAxis domain={[0, 115]} stroke={theme.colors.textSecondary} fontSize={12} />
          <Tooltip
            contentStyle={{
              background: theme.colors.backgroundPrimary,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius,
              color: theme.colors.textPrimary,
            }}
            itemStyle={{ color: theme.colors.textPrimary }}
            labelStyle={{ color: theme.colors.textSecondary }}
          />
          <Legend />
          <Bar dataKey="left" name="Left Hand" fill={LEFT_COLOR} radius={[4, 4, 0, 0]} />
          <Bar dataKey="right" name="Right Hand" fill={RIGHT_COLOR} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
