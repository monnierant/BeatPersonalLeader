import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Dot,
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

const formatDateTime = (ms: number): string => {
  const d = new Date(ms);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatDateShort = (ms: number): string => {
  const d = new Date(ms);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

interface SongBlocksCutChartProps {
  readonly scores: readonly PlayerScore[];
}

interface DotPayload {
  difficulty: string;
}

const renderDot = (props: { cx: number; cy: number; payload: DotPayload }) => {
  const color = DIFFICULTY_COLORS[props.payload.difficulty] ?? theme.colors.accent;
  return <Dot cx={props.cx} cy={props.cy} r={5} fill={color} stroke={color} />;
};

export const SongBlocksCutChart = ({ scores }: SongBlocksCutChartProps) => {
  const data = useMemo(
    () =>
      [...scores]
        .filter((s) => s.leaderboard.difficulty.notes > 0)
        .sort((a, b) => Number(a.timeset) - Number(b.timeset))
        .map((s) => {
          const totalNotes = s.leaderboard.difficulty.notes;
          const cut = totalNotes - s.missedNotes - s.badCuts;
          const diffName = s.leaderboard.difficulty.difficultyName;
          return {
            timestamp: Number(s.timeset) * 1000,
            cut,
            total: totalNotes,
            ratio: Number(((cut / totalNotes) * 100).toFixed(1)),
            difficulty: diffName,
          };
        }),
    [scores],
  );

  if (data.length === 0) return null;

  return (
    <StyledChartContainer>
      <StyledChartTitle>Blocks Cut Over Time</StyledChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(val: number) => formatDateShort(val)}
            stroke={theme.colors.textSecondary}
            fontSize={12}
          />
          <YAxis
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
            labelFormatter={(val: number) => formatDateTime(val)}
            formatter={(_: number, __: string, entry: { payload?: { cut: number; total: number; ratio: number; difficulty: string } }) => [
              `${entry.payload?.cut ?? 0} / ${entry.payload?.total ?? 0} (${entry.payload?.ratio ?? 0}%)`,
              entry.payload?.difficulty ?? '',
            ]}
          />
          <ReferenceLine
            y={100}
            stroke={theme.colors.success}
            strokeDasharray="3 3"
            strokeOpacity={0.5}
          />
          <Line
            type="monotone"
            dataKey="ratio"
            stroke={theme.colors.accent}
            strokeWidth={2}
            dot={renderDot}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};
