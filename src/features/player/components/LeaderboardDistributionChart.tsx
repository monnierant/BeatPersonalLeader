import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import styled from 'styled-components';
import { useGetLeaderboardScoreGraphQuery } from '../api/playerApi';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
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

const BUCKET_COUNT = 20;

interface LeaderboardDistributionChartProps {
  readonly leaderboardId: string;
  readonly playerAccuracy: number;
  readonly difficultyName: string;
}

export const LeaderboardDistributionChart = ({
  leaderboardId,
  playerAccuracy,
  difficultyName,
}: LeaderboardDistributionChartProps) => {
  const { data: scoreGraph, isLoading } =
    useGetLeaderboardScoreGraphQuery(leaderboardId);

  const distributionData = useMemo(() => {
    if (!scoreGraph || scoreGraph.length === 0) return [];

    const accuracies = scoreGraph.map((s) => s.accuracy);
    const min = Math.floor(Math.min(...accuracies));
    const max = Math.ceil(Math.max(...accuracies));
    const range = max - min || 1;
    const bucketSize = range / BUCKET_COUNT;

    const buckets = Array.from({ length: BUCKET_COUNT }, (_, i) => {
      const bucketMin = min + i * bucketSize;
      const bucketMax = bucketMin + bucketSize;
      const count = accuracies.filter(
        (a) => a >= bucketMin && (i === BUCKET_COUNT - 1 ? a <= bucketMax : a < bucketMax),
      ).length;
      return {
        range: `${bucketMin.toFixed(0)}%`,
        accuracy: Number(((bucketMin + bucketMax) / 2).toFixed(1)),
        count,
      };
    });

    return buckets;
  }, [scoreGraph]);

  const displayName =
    difficultyName === 'ExpertPlus' ? 'Expert+' : difficultyName;

  if (isLoading) {
    return (
      <StyledChartContainer>
        <StyledChartTitle>Leaderboard — {displayName}</StyledChartTitle>
        <LoadingSpinner />
      </StyledChartContainer>
    );
  }

  if (distributionData.length === 0) return null;

  return (
    <StyledChartContainer>
      <StyledChartTitle>Leaderboard Distribution — {displayName}</StyledChartTitle>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={distributionData}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis
            dataKey="accuracy"
            unit="%"
            stroke={theme.colors.textSecondary}
            fontSize={12}
          />
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
            formatter={(value: number) => [value, 'Players']}
            labelFormatter={(val: number) => `~${val}% accuracy`}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke={theme.colors.accent}
            fill={theme.colors.accent}
            fillOpacity={0.3}
          />
          <ReferenceLine
            x={Number(playerAccuracy.toFixed(1))}
            stroke={theme.colors.success}
            strokeWidth={2}
            strokeDasharray="5 5"
            label={{
              value: 'You',
              position: 'top',
              fill: theme.colors.success,
              fontSize: 12,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
