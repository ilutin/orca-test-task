import styled from 'styled-components'

export const TagStyled = styled.span`
  font-size: 14px;
  padding: 4px 20px;
  border-radius: 18px;
  color: ${({ theme }) => theme.colors.textColor};
  background-color: ${({ bgColor, theme }) => bgColor || theme.colors.icon};
`
