import styled from 'styled-components';
import type { LeaderboardSong } from '../types/player.types';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

const StyledCover = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius};
  object-fit: cover;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StyledSongName = styled.h1`
  font-size: 1.5rem;
`;

const StyledSubName = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const StyledDetailRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

const StyledDetailValue = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
`;

interface SongHeaderProps {
  readonly song: LeaderboardSong;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

export const SongHeader = ({ song }: SongHeaderProps) => (
  <StyledHeader>
    <StyledCover src={song.coverImage} alt={song.name} />
    <StyledInfo>
      <StyledSongName>
        {song.name}
        {song.subName && <StyledSubName>{song.subName}</StyledSubName>}
      </StyledSongName>
      <StyledDetailRow>
        <span>
          Author: <StyledDetailValue>{song.author}</StyledDetailValue>
        </span>
        <span>
          Mapper: <StyledDetailValue>{song.mapper}</StyledDetailValue>
        </span>
        <span>
          BPM: <StyledDetailValue>{Math.round(song.bpm)}</StyledDetailValue>
        </span>
        <span>
          Duration: <StyledDetailValue>{formatDuration(song.duration)}</StyledDetailValue>
        </span>
      </StyledDetailRow>
    </StyledInfo>
  </StyledHeader>
);
