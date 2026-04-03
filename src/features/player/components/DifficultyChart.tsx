import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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

interface DifficultyChartProps {
  readonly scores: readonly PlayerScore[];
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: theme.colors.difficultyEasy,
  Normal: theme.colors.difficultyNormal,
  Hard: theme.colors.difficultyHard,
  Expert: theme.colors.difficultyExpert,
  ExpertPlus: theme.colors.difficultyExpertPlus,
};

export const DifficultyChart = ({ scores }: DifficultyChartProps) => {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const score of scores) {
      const diff = score.leaderboard.difficulty.difficultyName;
      counts[diff] = (counts[diff] ?? 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [scores]);

  if (data.length === 0) return null;

  return (
    <StyledChartContainer>
      <StyledChartTitle>Difficulty Breakdown</StyledChartTitle>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={DIFFICULTY_COLORS[entry.name] ?? theme.colors.textSecondary}
              />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
