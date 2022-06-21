import styled from 'styled-components'

export const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${({ theme }) => theme.colors.primary};
`
