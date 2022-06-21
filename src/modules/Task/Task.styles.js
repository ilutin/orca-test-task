import styled, { css } from 'styled-components'

export const StyledTask = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 16px;
  padding: 15px 40px;
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${props => props.theme.colors.taskBg};
  transition: 0.3s ease-in-out;
  border-radius: 10px;

  &:hover {
    transform: scale(1.01);
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.icon};
  }

  &:focus {
    border: 1px solid ${props => props.theme.colors.icon};
  }

  ${props =>
    props.subTasksOpen &&
    css`
      background-color: ${props.theme.colors.secondary};
      color: ${props.theme.colors.icon};
    `}
`
