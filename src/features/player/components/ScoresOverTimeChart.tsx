import { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import styled from 'styled-components';
import type { PlayerScore } from '../types/player.types';
import { theme } from '../../../shared/styles/theme';
import { formatDate } from '../../../shared/utils/formatDate';

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

interface ScoresOverTimeChartProps {
  readonly scores: readonly PlayerScore[];
}

export const ScoresOverTimeChart = ({ scores }: ScoresOverTimeChartProps) => {
  const data = useMemo(
    () =>
      scores.map((s) => ({
        date: Number(s.timeset) * 1000,
        accuracy: Number((s.accuracy * 100).toFixed(2)),
        name: s.leaderboard.song.name,
      })),
    [scores],
  );

  if (data.length === 0) return null;

  return (
    <StyledChartContainer>
      <StyledChartTitle>Scores Over Time</StyledChartTitle>
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis
            dataKey="date"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(val: number) => formatDate(String(val / 1000))}
            stroke={theme.colors.textSecondary}
            fontSize={12}
          />
          <YAxis
            dataKey="accuracy"
            domain={[0, 100]}
            unit="%"
            stroke={theme.colors.textSecondary}
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              background: theme.colors.backgroundPrimary,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius,
              color: theme.colors.textPrimary,
            }}
            itemStyle={{ color: theme.colors.textPrimary }}
            labelStyle={{ color: theme.colors.textSecondary }}
            formatter={(value: number) => [`${value}%`, 'Accuracy']}
            labelFormatter={(val: number) => formatDate(String(val / 1000))}
          />
          <Scatter data={data} fill={theme.colors.accent} />
        </ScatterChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
