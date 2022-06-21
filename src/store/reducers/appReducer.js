import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alert: null,
  titleSort: null,
  createdTimeSort: null,
  searchBy: null,
  filterBy: [],
}

const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload
    },
    setTitleSort(state) {
      state.createdTimeSort = null

      if (state.titleSort && state.titleSort === 'asc') {
        state.titleSort = 'desc'
      } else {
        state.titleSort = 'asc'
      }
    },
    setCreatedTimeSort(state) {
      state.titleSort = null

      if (state.createdTimeSort && state.createdTimeSort === 'asc') {
        state.createdTimeSort = 'desc'
      } else {
        state.createdTimeSort = 'asc'
      }
    },
    setSearch(state, action) {
      state.searchBy = action.payload
    },
    setFilter(state, action) {
      state.filterBy = action.payload.map(label => label.value)
    },
    clearToolbar() {
      return initialState
    },
  },
})

export const { setAlert, setTitleSort, setCreatedTimeSort, setFilter, setSearch, clearToolbar } =
  appReducer.actions
export default appReducer.reducer
