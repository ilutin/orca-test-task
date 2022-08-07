import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Add } from '@styled-icons/fluentui-system-filled/Add'
import { TextSortAscending } from '@styled-icons/fluentui-system-filled/TextSortAscending'
import { TimePicker } from '@styled-icons/fluentui-system-filled/TimePicker'
import { Eraser } from '@styled-icons/fluentui-system-filled/Eraser'
import { setTitleSort, setCreatedTimeSort, clearToolbar } from 'store/reducers/appReducer'
import { Filter, SearchButton } from 'modules'
import { types } from 'store/actionTypes'
import { ToolbarStyled, ToolbarItemStyled, ToolbarTextStyled } from './Toolbar.styles'

const Toolbar = () => {
  const dispatch = useDispatch()
  const searchRef = React.createRef()
  const titleSort = useSelector(state => state.app.titleSort)
  const createdTimeSort = useSelector(state => state.app.createdTimeSort)

  const createTask = useCallback(() => {
    dispatch({ type: types.CREATE_TASK_SAGA })
  }, [dispatch])

  const sortByTitle = useCallback(() => {
    dispatch(setTitleSort())
  }, [dispatch])

  const sortByCreatedTime = useCallback(() => {
    dispatch(setCreatedTimeSort())
  }, [dispatch])

  const clearFilters = useCallback(() => {
    searchRef.current.value = ''
    dispatch(clearToolbar())
  }, [dispatch, searchRef])

  return (
    <ToolbarStyled>
      <ToolbarItemStyled>
        <Add onClick={createTask} />
      </ToolbarItemStyled>
      <ToolbarItemStyled selected={titleSort}>
        <TextSortAscending onClick={sortByTitle} />
      </ToolbarItemStyled>
      <ToolbarItemStyled selected={createdTimeSort}>
        <TimePicker onClick={sortByCreatedTime} />
      </ToolbarItemStyled>
      <ToolbarItemStyled>
        <SearchButton ref={searchRef} />
      </ToolbarItemStyled>
      <ToolbarItemStyled>
        <Filter />
      </ToolbarItemStyled>
      <ToolbarItemStyled onClick={clearFilters} border-left>
        <ToolbarTextStyled>Очистить</ToolbarTextStyled>
        <Eraser />
      </ToolbarItemStyled>
    </ToolbarStyled>
  )
}

export default Toolbar
