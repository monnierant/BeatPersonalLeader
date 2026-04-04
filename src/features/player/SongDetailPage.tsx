import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPlayerQuery, useGetPlayerScoresQuery } from './api/playerApi';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';
import { ErrorMessage } from '../../shared/components/ErrorMessage';
import { SongHeader } from './components/SongHeader';
import { AccuracyPerDifficultyChart } from './components/AccuracyPerDifficultyChart';
import { HandAccuracyChart } from './components/HandAccuracyChart';
import { LeaderboardDistributionChart } from './components/LeaderboardDistributionChart';
import { SongBlocksCutChart } from './components/SongBlocksCutChart';
import { SongScoresTable } from './components/SongScoresTable';
import type { PlayerScore } from './types/player.types';

const ALL_SCORES_PAGE_SIZE = 100;
const MAX_PAGES = 5;

const StyledBackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover {
    text-decoration: underline;
  }
`;

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
`;

const SongDetailPage = () => {
  const { id, songId } = useParams<{ id: string; songId: string }>();

  const {
    data: player,
    isLoading: playerLoading,
    error: playerError,
  } = useGetPlayerQuery(id ?? '', { skip: !id });

  const totalScores = player?.scoreStats.totalPlayCount ?? 0;
  const pagesToFetch = Math.min(
    Math.ceil(totalScores / ALL_SCORES_PAGE_SIZE),
    MAX_PAGES,
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

  const allScores = useMemo(() => {
    const pages = [page1, page2, page3, page4, page5];
    return pages
      .slice(0, pagesToFetch)
      .flatMap((q) => q.data?.data ?? []);
  }, [page1, page2, page3, page4, page5, pagesToFetch]);

  const songScores: readonly PlayerScore[] = useMemo(
    () => allScores.filter((s) => s.leaderboard.song.id === songId),
    [allScores, songId],
  );

  const scoresLoading = [page1, page2, page3, page4, page5]
    .slice(0, pagesToFetch)
    .some((q) => q.isLoading);

  if (!id || !songId) {
    return <ErrorMessage message="Missing player ID or song ID." />;
  }

  if (playerLoading || scoresLoading) {
    return <LoadingSpinner />;
  }

  if (playerError) {
    return <ErrorMessage message="Failed to load player profile." />;
  }

  const firstScore = songScores[0];
  if (!firstScore) {
    return (
      <div>
        <StyledBackLink to={`/player/${id}`}>← Back to profile</StyledBackLink>
        <ErrorMessage message="No scores found for this song." />
      </div>
    );
  }

  const song = firstScore.leaderboard.song;

  return (
    <div>
      <StyledBackLink to={`/player/${id}`}>← Back to profile</StyledBackLink>
      <SongHeader song={song} />

      <StyledSection>
        <StyledSectionTitle>Charts</StyledSectionTitle>
        <StyledChartsGrid>
          <SongBlocksCutChart scores={songScores} />
          <AccuracyPerDifficultyChart scores={songScores} />
          <HandAccuracyChart scores={songScores} />
          {songScores.map((score) => (
            <LeaderboardDistributionChart
              key={score.leaderboard.id}
              leaderboardId={score.leaderboard.id}
              playerAccuracy={score.accuracy * 100}
              difficultyName={score.leaderboard.difficulty.difficultyName}
            />
          ))}
        </StyledChartsGrid>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Score Details</StyledSectionTitle>
        <SongScoresTable scores={songScores} />
      </StyledSection>
    </div>
  );
};

export default SongDetailPage;
