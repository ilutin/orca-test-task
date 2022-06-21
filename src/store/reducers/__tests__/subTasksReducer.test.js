import reducer, { fetchSubTasks, deleteSubTask } from '../subTasksReducer'

const store = global.mockStore({
  subtasks: {},
  labels: [],
})

describe('subTasksReducer', () => {
  const state = store.getState()
  const taskId = '109645fc-63ab-4225-ab1c-3960712baa99'
  const mockedSubTasks = [
    {
      id: '70bd36ec-ad0f-4a4a-8af2-8dbcdddd2f2f',
      taskId,
      title: 'Impedit qui rem perspiciatis aliquam ut tempora dignissimos.',
      labels: ['dolores', 'omnis'],
    },
    {
      id: 'c4233b68-574f-4956-9300-d1656190eac8',
      taskId,
      title: 'Voluptatem magni mollitia fugit aut voluptates ut quis.',
      labels: ['non', 'ipsa', 'dolores'],
    },
  ]

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(state)
  })

  it('should set fetched subtasks and add unique labels', () => {
    expect(reducer(state, fetchSubTasks({ taskId, subtasks: mockedSubTasks }))).toStrictEqual({
      ...state,
      subtasks: {
        [taskId]: mockedSubTasks,
      },
      labels: ['dolores', 'omnis', 'non', 'ipsa'],
    })
  })

  it('should delete subtask by subtask id and task id', () => {
    const mockedState = {
      ...state,
      subtasks: { [taskId]: mockedSubTasks },
    }

    expect(reducer(mockedState, deleteSubTask({ taskId, id: mockedSubTasks[0].id }))).toStrictEqual(
      {
        ...state,
        subtasks: {
          [taskId]: [mockedSubTasks[1]],
        },
      },
    )
  })
})
