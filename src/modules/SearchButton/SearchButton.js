import React, { useCallback, useRef } from 'react'
import debounce from 'lodash.debounce'
import { Search } from '@styled-icons/fluentui-system-filled/Search'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from 'components/molecules'
import { setSearch } from 'store/reducers/appReducer'

const SearchButton = React.forwardRef((_, ref) => {
  const dispatch = useDispatch()
  const searchBy = useSelector(state => state.app.searchBy)

  const debouncedSearch = useRef(debounce(value => dispatch(setSearch(value)), 500)).current

  const onInputChange = useCallback(
    event => {
      debouncedSearch(event.target.value)
    },
    [debouncedSearch],
  )

  return (
    <IconButton
      placeholder="Type to Search..."
      onInputChange={onInputChange}
      ref={ref}
      isSelected={!!searchBy}
    >
      <Search />
    </IconButton>
  )
})

export default SearchButton
