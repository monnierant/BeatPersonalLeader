import { useMemo } from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';
import type { PlayerScore } from '../types/player.types';
import type { PlayerScoreStats } from '../types/player.types';
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

interface PerformanceRadarChartProps {
  readonly scores: readonly PlayerScore[];
  readonly stats: PlayerScoreStats;
}

const computePerformanceAxes = (
  scores: readonly PlayerScore[],
  stats: PlayerScoreStats,
) => {
  if (scores.length === 0) return [];

  const avgAccuracy = stats.averageAccuracy * 100;

  const topAccuracy = stats.topAccuracy * 100;

  const fcCount = scores.filter((s) => s.fullCombo).length;
  const fcRate = (fcCount / scores.length) * 100;

  const avgMisses =
    scores.reduce((sum, s) => sum + s.missedNotes + s.badCuts, 0) /
    scores.length;
  const consistencyScore = Math.max(0, 100 - avgMisses * 5);

  const difficultyValues = scores.map(
    (s) => s.leaderboard.difficulty.value,
  );
  const maxDiffValue = 9;
  const avgDifficulty =
    difficultyValues.reduce((sum, v) => sum + v, 0) / difficultyValues.length;
  const difficultyScore = (avgDifficulty / maxDiffValue) * 100;

  const avgRank =
    scores.reduce((sum, s) => sum + s.rank, 0) / scores.length;
  const rankScore = Math.max(0, Math.min(100, 100 - Math.log10(avgRank) * 25));

  return [
    { stat: 'Accuracy', value: Math.round(avgAccuracy) },
    { stat: 'Top Accuracy', value: Math.round(topAccuracy) },
    { stat: 'FC Rate', value: Math.round(fcRate) },
    { stat: 'Consistency', value: Math.round(consistencyScore) },
    { stat: 'Difficulty', value: Math.round(difficultyScore) },
    { stat: 'Ranking', value: Math.round(rankScore) },
  ];
};

export const PerformanceRadarChart = ({
  scores,
  stats,
}: PerformanceRadarChartProps) => {
  const data = useMemo(
    () => computePerformanceAxes(scores, stats),
    [scores, stats],
  );

  if (data.length === 0) return null;

  return (
    <StyledChartContainer>
      <StyledChartTitle>Performance Overview</StyledChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke={theme.colors.border} />
          <PolarAngleAxis
            dataKey="stat"
            stroke={theme.colors.textSecondary}
            fontSize={12}
            tick={{ fill: theme.colors.textPrimary }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            stroke={theme.colors.border}
            fontSize={10}
            tick={{ fill: theme.colors.textSecondary }}
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
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke={theme.colors.accent}
            fill={theme.colors.accent}
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
