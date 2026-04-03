import styled from 'styled-components';
import { PlayerSearchInput } from './components/PlayerSearchInput';
import { RecentProfiles } from './components/RecentProfiles';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const StyledSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

const HomePage = () => (
  <StyledContainer>
    <StyledTitle>
      Beat<span>Personal</span>Leader
    </StyledTitle>
    <StyledSubtitle>
      View your Beat Saber stats and all your scores from BeatLeader — ranked
      and unranked.
    </StyledSubtitle>
    <PlayerSearchInput />
    <RecentProfiles />
  </StyledContainer>
);

export default HomePage;
