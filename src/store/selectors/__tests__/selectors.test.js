import {
  selectTaskId,
  selectTitleSort,
  selectCreatedTimeSort,
  selectSearchBy,
  selectFilterBy,
  selectSubTasks,
  selectLabels,
  selectSubTaskByTaskId,
  selectTasks,
  selectFoundTasks,
  selectSortedTasks,
  selectFilteredTaskIds,
  selectFilteredTasks,
} from '../index'

const taskIds = ['109645fc-63ab-4225-ab1c-3960712baa99', '00615559-79b5-4669-929f-d96e0a1c4411']
const store = global.mockStore({
  app: {
    alert: 'alert',
    titleSort: 'asc',
    createdTimeSort: 'asc',
    searchBy: null,
    filterBy: ['label', 'tag'],
  },
  tasks: {
    tasks: [
      {
        id: taskIds[0],
        createTime: 1655661002150,
        title: 'Facilis quidem et.',
      },
      {
        id: taskIds[1],
        createTime: 1655665285452,
        title: 'Enim ea tempora ullam aut qui enim.',
      },
    ],
  },
  subtasks: {
    subtasks: {
      [taskIds[0]]: [
        {
          id: '70bd36ec-ad0f-4a4a-8af2-8dbcdddd2f2f',
          taskId: taskIds[0],
          title: 'Impedit qui rem perspiciatis aliquam ut tempora dignissimos.',
          labels: ['dolores', 'omnis'],
        },
        {
          id: 'c4233b68-574f-4956-9300-d1656190eac8',
          taskId: taskIds[0],
          title: 'Voluptatem magni mollitia fugit aut voluptates ut quis.',
          labels: ['non', 'ipsa', 'dolores'],
        },
      ],
      [taskIds[1]]: [
        {
          id: '70bd36ec-ad0f-4a4a-8af2-8dbcffff2111',
          taskId: taskIds[1],
          title: 'Voluptatem magnito',
          labels: ['non'],
        },
      ],
    },
    labels: ['dolores', 'omnis', 'non', 'ipsa'],
  },
})

describe('Redux selectors', () => {
  const state = store.getState()

  it('should return taskId from props', () => {
    const props = { taskId: taskIds[0] }

    expect(selectTaskId(null, props)).toBe(taskIds[0])
  })

  it('should return titleSort', () => {
    expect(selectTitleSort(state)).toBe(state.app.titleSort)
  })

  it('should return createdTimeSort', () => {
    expect(selectCreatedTimeSort(state)).toBe(state.app.createdTimeSort)
  })

  it('should return searchBy', () => {
    expect(selectSearchBy(state)).toBe(state.app.searchBy)
  })

  it('should return filterBy', () => {
    expect(selectFilterBy(state)).toStrictEqual(state.app.filterBy)
  })

  it('should return subtasks', () => {
    expect(selectSubTasks(state)).toStrictEqual(state.subtasks.subtasks)
  })

  it('should return labels', () => {
    expect(selectLabels(state)).toStrictEqual(state.subtasks.labels)
  })

  it('should return subtask by taskId', () => {
    expect(selectSubTaskByTaskId(state, { taskId: taskIds[0] })).toStrictEqual(
      state.subtasks.subtasks[taskIds[0]],
    )
  })

  it('should return tasks', () => {
    expect(selectTasks(state)).toStrictEqual(state.tasks.tasks)
  })

  describe('selectFoundTasks', () => {
    it('should return tasks if searchBy is empty', () => {
      expect(selectFoundTasks(state)).toStrictEqual(state.tasks.tasks)
    })

    it('should return tasks when task titles match the searchBy', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          searchBy: 'Facilis',
        },
      }

      expect(selectFoundTasks(mockedState)).toStrictEqual([state.tasks.tasks[0]])
    })

    it('should return tasks when subtask titles match the searchBy', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          searchBy: 'magnito',
        },
      }

      expect(selectFoundTasks(mockedState)).toStrictEqual([state.tasks.tasks[1]])
    })
  })

  describe('selectSortedTasks', () => {
    it('should return tasks if titleSort and createdTimeSort are empty', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          titleSort: null,
          createdTimeSort: null,
        },
      }

      expect(selectSortedTasks(mockedState)).toStrictEqual(state.tasks.tasks)
    })

    it('should return sorted tasks sorted tasks in ascending order by task title', () => {
      expect(selectSortedTasks(state)).toStrictEqual([...state.tasks.tasks].reverse())
    })

    it('should return sorted tasks sorted tasks in descending order by task title', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          titleSort: 'desc',
        },
      }

      expect(selectSortedTasks(mockedState)).toStrictEqual(state.tasks.tasks)
    })

    it('should return sorted tasks in ascending order by task create time', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          titleSort: null,
          createdTimeSort: 'asc',
        },
      }

      expect(selectSortedTasks(mockedState)).toStrictEqual(state.tasks.tasks)
    })

    it('should return sorted tasks in descending order by task create time', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          titleSort: null,
          createdTimeSort: 'desc',
        },
      }

      expect(selectSortedTasks(mockedState)).toStrictEqual([...state.tasks.tasks].reverse())
    })
  })

  describe('selectFilteredTaskIds', () => {
    it('should return null when filterBy is empty', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          filterBy: [],
        },
      }

      expect(selectFilteredTaskIds(mockedState)).toBeNull()
    })

    it('should return filtered task ids', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          filterBy: ['omnis'],
        },
      }

      expect(selectFilteredTaskIds(mockedState)).toStrictEqual([taskIds[0]])
    })
  })

  describe('selectFilteredTasks', () => {
    it('should return sorted tasks when taskIds is null', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          titleSort: null,
          createdTimeSort: null,
          filterBy: null,
        },
      }

      expect(selectFilteredTasks(mockedState)).toStrictEqual(state.tasks.tasks)
    })

    it('should return filtered task ids', () => {
      const mockedState = {
        ...state,
        app: {
          ...state.app,
          filterBy: ['omnis'],
        },
      }

      expect(selectFilteredTasks(mockedState)).toStrictEqual([state.tasks.tasks[0]])
    })
  })
})
