import styled from 'styled-components';

const StyledError = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.accent};
`;

interface ErrorMessageProps {
  readonly message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <StyledError role="alert">{message}</StyledError>
);
