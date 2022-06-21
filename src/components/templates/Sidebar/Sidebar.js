import React from 'react'
import {
  SidebarStyled,
  SidebarContentStyled,
  CalendarTodayStyled,
  StarArrowRightStartStyled,
  CalendarLtrStyled,
  StackStyled,
  TimelineStyled,
  HistoryStyled,
  FolderOpenStyled,
} from './Sidebar.styles'

const Sidebar = () => (
  <SidebarStyled>
    <SidebarContentStyled>
      <ul>
        <li>
          <CalendarTodayStyled />
          <span>Входящие</span>
        </li>
      </ul>
      <ul>
        <li>
          <StarArrowRightStartStyled />
          <span>Сегодня</span>
        </li>
        <li>
          <CalendarLtrStyled />
          <span>Планы</span>
        </li>
        <li>
          <StackStyled />
          <span>В любое время</span>
        </li>
        <li>
          <TimelineStyled />
          <span>Когда-нибудь</span>
        </li>
      </ul>
      <ul>
        <li>
          <HistoryStyled />
          <span>Журнал</span>
        </li>
        <li>
          <FolderOpenStyled />
          <span>Корзина</span>
        </li>
      </ul>
    </SidebarContentStyled>
  </SidebarStyled>
)

export default Sidebar
