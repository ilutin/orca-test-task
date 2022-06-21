import styled, { css } from 'styled-components'
import { Text } from 'components/atoms'

export const ToolbarStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  overflow: auto;
`

export const ToolbarItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.icon};
  transition: all 0.4s ease-in, border 0s, border-radius 0s, background-color 0s;
  cursor: pointer;
  min-width: 50px;
  height: 50px;
  margin: 0 2%;

  &:hover {
    color: ${({ theme }) => theme.colors.iconHover};
  }

  & svg:hover {
    transform: scale(1.1);
    transition-duration: 200ms;
    color: ${({ theme }) => theme.colors.iconHover};
  }

  ${props =>
    props['border-left'] &&
    css`
      border-left: 1px solid ${props.theme.colors.icon};
      height: 30px;
    `}

  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.colors.secondary};
      color: ${({ theme }) => theme.colors.textColor};
      border-radius: 50%;
    `}
`

export const ToolbarTextStyled = styled(Text)`
  margin: 0 1vw 0 2vw;
`
