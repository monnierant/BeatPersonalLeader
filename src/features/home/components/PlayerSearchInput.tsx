import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { parsePlayerId } from '../../../shared/utils/parsePlayerId';

const StyledForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  max-width: 600px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundInput};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const StyledButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`;

const StyledError = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const PlayerSearchInput = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const playerId = parsePlayerId(input);

    if (!playerId) {
      setError('Please enter a valid BeatLeader profile URL or player ID.');
      return;
    }

    setError('');
    void navigate(`/player/${playerId}`);
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="https://beatleader.com/u/123456 or just 123456"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
        />
        <StyledButton type="submit">View Profile</StyledButton>
      </StyledForm>
      {error && <StyledError>{error}</StyledError>}
    </div>
  );
};
