import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
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

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: theme.colors.difficultyEasy,
  Normal: theme.colors.difficultyNormal,
  Hard: theme.colors.difficultyHard,
  Expert: theme.colors.difficultyExpert,
  ExpertPlus: theme.colors.difficultyExpertPlus,
};

interface AccuracyPerDifficultyChartProps {
  readonly scores: readonly PlayerScore[];
}

export const AccuracyPerDifficultyChart = ({
  scores,
}: AccuracyPerDifficultyChartProps) => {
  const data = useMemo(
    () =>
      scores.map((s) => ({
        difficulty:
          s.leaderboard.difficulty.difficultyName === 'ExpertPlus'
            ? 'Expert+'
            : s.leaderboard.difficulty.difficultyName,
        rawDifficulty: s.leaderboard.difficulty.difficultyName,
        accuracy: Number((s.accuracy * 100).toFixed(2)),
        fcAccuracy: Number((s.fcAccuracy * 100).toFixed(2)),
      })),
    [scores],
  );

  if (data.length === 0) return null;

  return (
    <StyledChartContainer>
      <StyledChartTitle>Accuracy per Difficulty</StyledChartTitle>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis dataKey="difficulty" stroke={theme.colors.textSecondary} fontSize={12} />
          <YAxis domain={[0, 100]} unit="%" stroke={theme.colors.textSecondary} fontSize={12} />
          <Tooltip
            contentStyle={{
              background: theme.colors.backgroundPrimary,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius,
              color: theme.colors.textPrimary,
            }}
            itemStyle={{ color: theme.colors.textPrimary }}
            labelStyle={{ color: theme.colors.textSecondary }}
            formatter={(value: number, name: string) => [
              `${value}%`,
              name === 'accuracy' ? 'Accuracy' : 'FC Accuracy',
            ]}
          />
          <Bar dataKey="accuracy" name="accuracy" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.rawDifficulty}
                fill={DIFFICULTY_COLORS[entry.rawDifficulty] ?? theme.colors.accent}
              />
            ))}
          </Bar>
          <Bar dataKey="fcAccuracy" name="fcAccuracy" radius={[4, 4, 0, 0]} fillOpacity={0.4}>
            {data.map((entry) => (
              <Cell
                key={`fc-${entry.rawDifficulty}`}
                fill={DIFFICULTY_COLORS[entry.rawDifficulty] ?? theme.colors.accent}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
