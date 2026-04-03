import styled from 'styled-components';
import { Navbar } from './Navbar';

const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <StyledLayout>
    <Navbar />
    <StyledMain>{children}</StyledMain>
  </StyledLayout>
);
