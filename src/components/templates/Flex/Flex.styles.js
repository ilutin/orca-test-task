import styled, { css } from 'styled-components'

export const FlexStyled = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'stretch'};
  align-items: ${props => props.align || 'stretch'};
  margin: ${({ margin }) => margin || '0'};
  gap: ${({ gap }) => gap || '0'};

  ${props =>
    props['h-100'] &&
    css`
      height: 100%;
    `}
`
