import styled, { css, keyframes } from 'styled-components'

const strikeAnimation = keyframes`
  from {
    text-decoration-color: transparent;
  }

  to {
    text-decoration-color: #fff;
  }
`

export const TextStyled = styled.div`
  font-size: ${({ size }) => size || '14px'};

  ${props =>
    props.strike &&
    css`
      text-decoration: line-through;
      animation: ${strikeAnimation} 1s linear;
      text-decoration-thickness: 2px;
    `}
`
