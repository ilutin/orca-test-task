import styled, { css, keyframes } from 'styled-components'
import { DeleteDismiss } from '@styled-icons/fluentui-system-filled/DeleteDismiss'

const hideAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0.1;
  }
`

export const SubTaskStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.95rem;

  ${props =>
    props.hide &&
    css`
      animation: ${hideAnimation} 1.5s infinite;
    `}
`

export const DeleteDismissStyled = styled(DeleteDismiss)`
  color: #ff7272b8;
`
