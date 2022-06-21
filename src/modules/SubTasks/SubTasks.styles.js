import styled from 'styled-components'

export const SubTasksStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px 10px;
  margin-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.textColor};
`
