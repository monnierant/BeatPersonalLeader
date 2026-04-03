import styled from 'styled-components';

const StyledNav = styled.nav`
  background: ${({ theme }) => theme.colors.backgroundCard};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StyledLogo = styled.a`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;

  &:hover {
    text-decoration: none;
    opacity: 0.9;
  }
`;

export const Navbar = () => (
  <StyledNav>
    <StyledLogo href="#/">BeatPersonalLeader</StyledLogo>
  </StyledNav>
);
