import reducer, {
  clearToolbar,
  setAlert,
  setCreatedTimeSort,
  setFilter,
  setSearch,
  setTitleSort,
} from '../appReducer'

const store = global.mockStore({
  alert: null,
  titleSort: null,
  createdTimeSort: null,
  searchBy: null,
  filterBy: [],
})

describe('appReducer', () => {
  const state = store.getState()

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(state)
  })

  it('should set the alert', () => {
    expect(reducer(state, setAlert('Alert'))).toStrictEqual({
      ...state,
      alert: 'Alert',
    })
  })

  it('should set ascending title sort', () => {
    expect(reducer(state, setTitleSort('asc'))).toStrictEqual({
      ...state,
      titleSort: 'asc',
    })
  })

  it('should set descending title sort', () => {
    expect(reducer(state, setTitleSort('asc'))).toStrictEqual({
      ...state,
      titleSort: 'asc',
    })
  })

  it('should unset create time sort and set title sort', () => {
    const mockedState = {
      ...state,
      createdTimeSort: 'asc',
    }

    expect(reducer(mockedState, setTitleSort('asc'))).toStrictEqual({
      ...state,
      createdTimeSort: null,
      titleSort: 'asc',
    })
  })

  it('should set ascending create time sort', () => {
    expect(reducer(state, setCreatedTimeSort('asc'))).toStrictEqual({
      ...state,
      createdTimeSort: 'asc',
    })
  })

  it('should set descending create time sort', () => {
    expect(reducer(state, setCreatedTimeSort('asc'))).toStrictEqual({
      ...state,
      createdTimeSort: 'asc',
    })
  })

  it('should unset title sort sort and set create time sort', () => {
    const mockedState = {
      ...state,
      titleSort: 'asc',
    }

    expect(reducer(mockedState, setCreatedTimeSort('asc'))).toStrictEqual({
      ...state,
      titleSort: null,
      createdTimeSort: 'asc',
    })
  })

  it('should set search string', () => {
    expect(reducer(state, setSearch('Dolor'))).toStrictEqual({
      ...state,
      searchBy: 'Dolor',
    })
  })

  it('should set filters', () => {
    const payload = [
      { value: 'non', label: 'non' },
      { value: 'et', label: 'et' },
    ]

    expect(reducer(state, setFilter(payload))).toStrictEqual({
      ...state,
      filterBy: ['non', 'et'],
    })
  })

  it('should clear all filters', () => {
    const mockedState = {
      alert: 'Alert',
      titleSort: 'asc',
      createdTimeSort: 'desc',
      searchBy: 'dolor',
      filterBy: ['non', 'et'],
    }

    expect(reducer(mockedState, clearToolbar())).toStrictEqual(state)
  })
})
