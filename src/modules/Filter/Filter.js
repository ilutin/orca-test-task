import React, { useCallback } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from 'store/reducers/appReducer'
import { selectFilterBy, selectLabels } from 'store/selectors'
import { StyledFilter } from './Filter.styles'

const mapItems = items => items.map(item => ({ label: item, value: item }))

const Filter = props => {
  const dispatch = useDispatch()
  const filterBy = useSelector(selectFilterBy)
  const labels = useSelector(selectLabels)

  const options = mapItems(labels)
  const filters = mapItems(filterBy)

  const onChange = useCallback(
    event => {
      dispatch(setFilter(event))
    },
    [dispatch],
  )

  return (
    <StyledFilter {...props}>
      <MultiSelect
        options={options}
        value={filters}
        onChange={onChange}
        labelledBy="Filter"
        hasSelectAll={false}
        debounceDuration={500}
      />
    </StyledFilter>
  )
}

export default React.memo(Filter)
