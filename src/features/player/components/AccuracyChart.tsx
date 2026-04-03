import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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

interface AccuracyChartProps {
  readonly scores: readonly PlayerScore[];
}

const ACCURACY_BUCKETS = [
  { label: '<60%', min: 0, max: 0.6 },
  { label: '60-70%', min: 0.6, max: 0.7 },
  { label: '70-80%', min: 0.7, max: 0.8 },
  { label: '80-90%', min: 0.8, max: 0.9 },
  { label: '90-95%', min: 0.9, max: 0.95 },
  { label: '95-100%', min: 0.95, max: 1.01 },
] as const;

export const AccuracyChart = ({ scores }: AccuracyChartProps) => {
  const data = useMemo(
    () =>
      ACCURACY_BUCKETS.map((bucket) => ({
        name: bucket.label,
        count: scores.filter(
          (s) => s.accuracy >= bucket.min && s.accuracy < bucket.max,
        ).length,
      })),
    [scores],
  );

  return (
    <StyledChartContainer>
      <StyledChartTitle>Accuracy Distribution</StyledChartTitle>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis dataKey="name" stroke={theme.colors.textSecondary} fontSize={12} />
          <YAxis stroke={theme.colors.textSecondary} fontSize={12} />
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
          <Bar dataKey="count" fill={theme.colors.accent} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
