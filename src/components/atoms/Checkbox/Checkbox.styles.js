import styled, { css } from 'styled-components'

export const CheckboxStyled = styled.div`
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.icon};
  margin-right: 10px;
  transition: 0.5s ease-in;

  ${props =>
    props.checked &&
    css`
      background-color: ${({ theme }) => theme.colors.icon};
    `}
`
