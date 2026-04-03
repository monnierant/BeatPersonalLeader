import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPlayerQuery, useGetPlayerScoresQuery } from './api/playerApi';
import { PlayerHeader } from './components/PlayerHeader';
import { StatCards } from './components/StatCards';
import { AccuracyChart } from './components/AccuracyChart';
import { DifficultyChart } from './components/DifficultyChart';
import { ScoresOverTimeChart } from './components/ScoresOverTimeChart';
import { PerformanceRadarChart } from './components/PerformanceRadarChart';
import { BlocksCutChart } from './components/BlocksCutChart';
import { ScoresList } from './components/ScoresList';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';
import { ErrorMessage } from '../../shared/components/ErrorMessage';
import { saveRecentProfile } from '../home/components/RecentProfiles';

const StyledSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StyledSectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ALL_SCORES_PAGE_SIZE = 100;
const MAX_CHART_PAGES = 5;

const PlayerPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: player,
    isLoading: playerLoading,
    error: playerError,
  } = useGetPlayerQuery(id ?? '', { skip: !id });

  const totalScores = player?.scoreStats.totalPlayCount ?? 0;
  const pagesToFetch = Math.min(
    Math.ceil(totalScores / ALL_SCORES_PAGE_SIZE),
    MAX_CHART_PAGES,
  );

  const scoreQueries = Array.from({ length: pagesToFetch }, (_, i) => i + 1);

  const page1 = useGetPlayerScoresQuery(
    { playerId: id ?? '', page: 1, count: ALL_SCORES_PAGE_SIZE, sortBy: 'date', order: 'desc' },
    { skip: !id || !player },
  );
  const page2 = useGetPlayerScoresQuery(
    { playerId: id ?? '', page: 2, count: ALL_SCORES_PAGE_SIZE, sortBy: 'date', order: 'desc' },
    { skip: !id || !player || scoreQueries.length < 2 },
  );
  const page3 = useGetPlayerScoresQuery(
    { playerId: id ?? '', page: 3, count: ALL_SCORES_PAGE_SIZE, sortBy: 'date', order: 'desc' },
    { skip: !id || !player || scoreQueries.length < 3 },
  );
  const page4 = useGetPlayerScoresQuery(
    { playerId: id ?? '', page: 4, count: ALL_SCORES_PAGE_SIZE, sortBy: 'date', order: 'desc' },
    { skip: !id || !player || scoreQueries.length < 4 },
  );
  const page5 = useGetPlayerScoresQuery(
    { playerId: id ?? '', page: 5, count: ALL_SCORES_PAGE_SIZE, sortBy: 'date', order: 'desc' },
    { skip: !id || !player || scoreQueries.length < 5 },
  );

  const allChartScores = useMemo(() => {
    const pages = [page1, page2, page3, page4, page5];
    return pages
      .slice(0, pagesToFetch)
      .flatMap((q) => q.data?.data ?? []);
  }, [page1, page2, page3, page4, page5, pagesToFetch]);

  useEffect(() => {
    if (player) {
      saveRecentProfile({ id: player.id, name: player.name });
    }
  }, [player]);

  if (!id) {
    return <ErrorMessage message="No player ID provided." />;
  }

  if (playerLoading) {
    return <LoadingSpinner />;
  }

  if (playerError) {
    return <ErrorMessage message="Failed to load player profile. Check the player ID and try again." />;
  }

  if (!player) {
    return <ErrorMessage message="Player not found." />;
  }

  return (
    <div>
      <PlayerHeader player={player} />
      <StatCards stats={player.scoreStats} />

      <StyledSection>
        <StyledSectionTitle>Charts</StyledSectionTitle>
        <StyledChartsGrid>
          <AccuracyChart scores={allChartScores} />
          <DifficultyChart scores={allChartScores} />
          <ScoresOverTimeChart scores={allChartScores} />
          <PerformanceRadarChart scores={allChartScores} stats={player.scoreStats} />
          <BlocksCutChart scores={allChartScores} />
        </StyledChartsGrid>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>
          All Scores ({player.scoreStats.totalPlayCount})
        </StyledSectionTitle>
        <ScoresList playerId={id} />
      </StyledSection>
    </div>
  );
};

export default PlayerPage;
