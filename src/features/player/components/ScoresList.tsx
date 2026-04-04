import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { RootState } from '../../../app/store';
import { useGetPlayerScoresQuery } from '../api/playerApi';
import {
  setSortBy,
  toggleOrder,
  setSearch,
  setDifficulty,
  setPage,
} from '../scoresFilterSlice';
import { formatAccuracy } from '../../../shared/utils/formatAccuracy';
import { formatDate } from '../../../shared/utils/formatDate';
import { formatScore } from '../../../shared/utils/formatScore';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
import { ErrorMessage } from '../../../shared/components/ErrorMessage';
import { Pagination } from '../../../shared/components/Pagination';
import { DEBOUNCE_DELAY_MS, DIFFICULTY_LABELS } from '../../../shared/constants';
import { useDebounce } from '../hooks/useDebounce';

const StyledControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const StyledSearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundInput};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 0.875rem;
  min-width: 200px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const StyledSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundInput};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 0.875rem;
  cursor: pointer;
`;

const StyledSortButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

const StyledTh = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledTd = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.875rem;
  vertical-align: middle;
`;

const StyledCover = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

const StyledDifficulty = styled.span<{ $difficulty: string }>`
  font-weight: 600;
  font-size: 0.8rem;
  color: ${({ $difficulty, theme }) => {
    const colorMap: Record<string, string> = {
      Easy: theme.colors.difficultyEasy,
      Normal: theme.colors.difficultyNormal,
      Hard: theme.colors.difficultyHard,
      Expert: theme.colors.difficultyExpert,
      ExpertPlus: theme.colors.difficultyExpertPlus,
    };
    return colorMap[$difficulty] ?? theme.colors.textPrimary;
  }};
`;

const StyledFcBadge = styled.span`
  color: ${({ theme }) => theme.colors.success};
  font-weight: 700;
  font-size: 0.8rem;
`;

const StyledModifiers = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledEmptyRow = styled.td`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledClickableRow = styled.tr`
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundInput};
  }
`;

interface ScoresListProps {
  readonly playerId: string;
}

export const ScoresList = ({ playerId }: ScoresListProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortBy, order, search, difficulty, page, pageSize } = useSelector(
    (state: RootState) => state.scoresFilter,
  );

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY_MS);

  const { data, isLoading, error } = useGetPlayerScoresQuery({
    playerId,
    page,
    count: pageSize,
    sortBy,
    order,
    search: debouncedSearch || undefined,
    diff: difficulty || undefined,
  });

  const totalPages = data
    ? Math.ceil(data.metadata.total / data.metadata.itemsPerPage)
    : 0;

  const handlePageChange = useCallback(
    (newPage: number) => dispatch(setPage(newPage)),
    [dispatch],
  );

  return (
    <div>
      <StyledControls>
        <StyledSearchInput
          type="text"
          placeholder="Search song..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <StyledSelect
          value={difficulty}
          onChange={(e) => dispatch(setDifficulty(e.target.value))}
        >
          <option value="">All Difficulties</option>
          {DIFFICULTY_LABELS.map((d) => (
            <option key={d} value={d.toLowerCase()}>
              {d === 'ExpertPlus' ? 'Expert+' : d}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="date">Sort by Date</option>
          <option value="acc">Sort by Accuracy</option>
        </StyledSelect>
        <StyledSortButton onClick={() => dispatch(toggleOrder())}>
          {order === 'desc' ? '↓ Desc' : '↑ Asc'}
        </StyledSortButton>
      </StyledControls>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Failed to load scores." />}

      {data && (
        <>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh></StyledTh>
                <StyledTh>Song</StyledTh>
                <StyledTh>Difficulty</StyledTh>
                <StyledTh>Accuracy</StyledTh>
                <StyledTh>Score</StyledTh>
                <StyledTh>Rank</StyledTh>
                <StyledTh>FC</StyledTh>
                <StyledTh>Modifiers</StyledTh>
                <StyledTh>Blocks Cut</StyledTh>
                <StyledTh>Misses</StyledTh>
                <StyledTh>Bad Cuts</StyledTh>
                <StyledTh>Date</StyledTh>
              </tr>
            </thead>
            <tbody>
              {data.data.length === 0 ? (
                <tr>
                  <StyledEmptyRow colSpan={12}>No scores found.</StyledEmptyRow>
                </tr>
              ) : (
                data.data.map((score) => (
                  <StyledClickableRow
                    key={score.id}
                    onClick={() =>
                      void navigate(
                        `/player/${playerId}/song/${score.leaderboard.song.id}`,
                      )
                    }
                  >
                    <StyledTd>
                      <StyledCover
                        src={score.leaderboard.song.coverImage}
                        alt={score.leaderboard.song.name}
                        loading="lazy"
                      />
                    </StyledTd>
                    <StyledTd>
                      {score.leaderboard.song.name}
                      {score.leaderboard.song.subName && (
                        <> — {score.leaderboard.song.subName}</>
                      )}
                    </StyledTd>
                    <StyledTd>
                      <StyledDifficulty
                        $difficulty={score.leaderboard.difficulty.difficultyName}
                      >
                        {score.leaderboard.difficulty.difficultyName === 'ExpertPlus'
                          ? 'Expert+'
                          : score.leaderboard.difficulty.difficultyName}
                      </StyledDifficulty>
                      {score.leaderboard.difficulty.modeName !== 'Standard' && (
                        <> ({score.leaderboard.difficulty.modeName})</>
                      )}
                    </StyledTd>
                    <StyledTd>{formatAccuracy(score.accuracy)}</StyledTd>
                    <StyledTd>{formatScore(score.baseScore)}</StyledTd>
                    <StyledTd>#{score.rank}</StyledTd>
                    <StyledTd>
                      {score.fullCombo && <StyledFcBadge>FC</StyledFcBadge>}
                    </StyledTd>
                    <StyledTd>
                      <StyledModifiers>
                        {score.modifiers || '—'}
                      </StyledModifiers>
                    </StyledTd>
                    <StyledTd>
                      {formatScore(score.leaderboard.difficulty.notes - score.missedNotes - score.badCuts)}
                      /{formatScore(score.leaderboard.difficulty.notes)}
                    </StyledTd>
                    <StyledTd>{score.missedNotes}</StyledTd>
                    <StyledTd>{score.badCuts}</StyledTd>
                    <StyledTd>{formatDate(score.timeset)}</StyledTd>
                  </StyledClickableRow>
                ))
              )}
            </tbody>
          </StyledTable>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
