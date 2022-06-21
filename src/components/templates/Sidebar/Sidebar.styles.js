import styled from 'styled-components'
import { CalendarToday } from '@styled-icons/fluentui-system-filled/CalendarToday'
import { StarArrowRightStart } from '@styled-icons/fluentui-system-filled/StarArrowRightStart'
import { Stack } from '@styled-icons/fluentui-system-filled/Stack'
import { Timeline } from '@styled-icons/fluentui-system-filled/Timeline'
import { History } from '@styled-icons/fluentui-system-filled/History'
import { FolderOpen } from '@styled-icons/fluentui-system-filled/FolderOpen'
import { CalendarLtr } from '@styled-icons/fluentui-system-filled/CalendarLtr'

export const SidebarStyled = styled.aside`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 20vw;
  border-right: 1px solid ${({ theme }) => theme.colors.secondary};
  position: relative;
  display: flex;
  justify-content: center;
  transition: 0.3s linear;

  @media ${props => props.theme.media.laptop} {
    width: 10vw;
  }
`

export const SidebarContentStyled = styled.div`
  padding: 20px;
  margin-top: 10vh;
  transition: 0.3s linear;

  & ul {
    margin-bottom: 50px;

    & li {
      color: ${({ theme }) => theme.colors.textColor};
      margin-bottom: 20px;
      font-weight: 500;
      font-size: calc(0.8rem + 0.4vw);
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: 0.4s ease-out;

      &:hover {
        color: ${({ theme }) => theme.colors.icon};
      }

      & svg {
        margin-right: 1vw;
      }
    }
  }

  @media ${props => props.theme.media.laptop} {
    & li span {
      display: none;
    }

    & li svg {
      margin: 15% 0;
      transform: scale(1.3);
    }
  }
`

export const CalendarTodayStyled = styled(CalendarToday)`
  color: #0087e8cf;
`

export const StarArrowRightStartStyled = styled(StarArrowRightStart)`
  color: #f8d800eb;
`

export const CalendarLtrStyled = styled(CalendarLtr)`
  color: #f6416ce6;
`

export const StackStyled = styled(Stack)`
  color: #32ccbc;
`

export const TimelineStyled = styled(Timeline)`
  color: #ffe485e8;
`

export const HistoryStyled = styled(History)`
  color: #5fc744;
`

export const FolderOpenStyled = styled(FolderOpen)`
  color: #9452a5;
`
