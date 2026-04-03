import styled from 'styled-components';

const StyledContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const StyledMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    text-decoration: none;
  }
`;

const NotFoundPage = () => (
  <StyledContainer>
    <StyledTitle>404</StyledTitle>
    <StyledMessage>The page you are looking for does not exist.</StyledMessage>
    <StyledLink href="#/">Go Home</StyledLink>
  </StyledContainer>
);

export default NotFoundPage;
