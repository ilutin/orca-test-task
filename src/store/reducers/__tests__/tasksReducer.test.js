import reducer, { setTasksLoading, fetchTasks, createTask, deleteTask } from '../tasksReducer'

const store = global.mockStore({
  loading: false,
  tasks: [],
})

describe('tasksReducer', () => {
  const state = store.getState()
  const mockedTasks = [
    {
      id: '91496ac8-790e-4d8b-aaaa-4e3ea46d1a01',
      createTime: 1655661002150,
      title: 'Facilis quidem et.',
    },
    {
      id: '00615559-79b5-4669-929f-d96e0a1c4411',
      createTime: 1655665285452,
      title: 'Enim ea tempora ullam aut qui enim.',
    },
  ]

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(state)
  })

  it('should set loading status', () => {
    expect(reducer(state, setTasksLoading(true))).toStrictEqual({
      ...state,
      loading: true,
    })
  })

  it('should set fetched tasks', () => {
    expect(reducer(state, fetchTasks(mockedTasks))).toStrictEqual({
      ...state,
      tasks: mockedTasks,
    })
  })

  it('should add a new task', () => {
    const newTask = {
      id: 'b6ccb23e-3593-4b5f-a17d-c4a17ef4853b',
      createTime: 1655742730003,
      title: 'Aliquid enim fugit vero assumenda ratione occaecati aut officia eaque.',
    }

    const mockedState = {
      ...state,
      tasks: mockedTasks,
    }

    expect(reducer(mockedState, createTask(newTask))).toStrictEqual({
      ...state,
      tasks: [...mockedTasks, newTask],
    })
  })

  it('should delete task by task id', () => {
    const mockedState = {
      ...state,
      tasks: mockedTasks,
    }

    expect(reducer(mockedState, deleteTask({ id: mockedTasks[0].id }))).toStrictEqual({
      ...state,
      tasks: [mockedTasks[1]],
    })
  })
})
