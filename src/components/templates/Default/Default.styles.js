import styled from 'styled-components'
import { StyledIconBase } from '@styled-icons/styled-icon'

export const DefaultStyled = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  ${StyledIconBase} {
    height: 24px;
    width: 24px;
  }
`
