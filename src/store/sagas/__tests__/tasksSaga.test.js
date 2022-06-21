/* eslint-disable jest/no-test-return-statement */
import { call } from 'redux-saga/effects'
import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import * as matchers from 'redux-saga-test-plan/matchers'
import * as tasksAPI from 'api/tasks'
import tasksReducer, {
  createTask,
  fetchTasks,
  setTasksLoading,
  deleteTask,
} from 'store/reducers/tasksReducer'
import { appReducer } from 'store/reducers'
import { fetchTasksSaga, createTaskSaga, deleteTaskSaga } from '../tasksSaga'
import { fetchSubTasksSaga } from '../subTasksSaga'

describe('tasksSaga', () => {
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

  const task = {
    id: 'b6ccb23e-3593-4b5f-a17d-c4a17ef4853b',
    createTime: 1655742730003,
    title: 'Aliquid enim fugit vero assumenda ratione occaecati aut officia eaque.',
  }

  const error = new Error('Testing error')

  describe('Integration tests', () => {
    describe('fetchTasksSaga', () => {
      it('should fetch tasks', () =>
        expectSaga(fetchTasksSaga)
          .withReducer(tasksReducer)
          .provide([[call(tasksAPI.fetchTasks), mockedTasks]])
          .dispatch({ type: 'FETCH_TASKS_SAGA' })
          .put(setTasksLoading(true))
          .put(fetchTasks(mockedTasks))
          .put(setTasksLoading(false))
          .hasFinalState({
            loading: false,
            tasks: mockedTasks,
          })
          .run())

      it('should stop tasks fetching when error', () =>
        expectSaga(fetchTasksSaga)
          .withReducer(tasksReducer)
          .provide([[call(tasksAPI.fetchTasks), throwError(error)]])
          .dispatch({ type: 'FETCH_TASKS_SAGA' })
          .put(setTasksLoading(true))
          .put(setTasksLoading(false))
          .hasFinalState({
            loading: false,
            tasks: [],
          })
          .run())

      it('should set fetching tasks error', () =>
        expectSaga(fetchTasksSaga)
          .withReducer(appReducer)
          .provide([[call(tasksAPI.fetchTasks), throwError(error)]])
          .dispatch({ type: 'FETCH_TASKS_SAGA' })
          .hasFinalState({
            alert: 'Ошибка загрузки задач',
            titleSort: null,
            createdTimeSort: null,
            searchBy: null,
            filterBy: [],
          })
          .run())
    })

    describe('createTaskSaga', () => {
      it('should create a task', () =>
        expectSaga(createTaskSaga)
          .withReducer(tasksReducer)
          .provide([[matchers.call.fn(tasksAPI.createTask), task]])
          .put(createTask(task))
          .hasFinalState({
            loading: false,
            tasks: [task],
          })
          .run())

      it('should stop creating task when error', () =>
        expectSaga(createTaskSaga)
          .withReducer(tasksReducer)
          .provide([[call(tasksAPI.createTask), throwError(error)]])
          .dispatch({ type: 'CREATE_TASK_SAGA' })
          .hasFinalState({
            loading: false,
            tasks: [],
          })
          .run())

      it('should set creating task error', () =>
        expectSaga(createTaskSaga)
          .withReducer(appReducer)
          .provide([[call(tasksAPI.createTask), throwError(error)]])
          .dispatch({ type: 'CREATE_TASK_SAGA' })
          .hasFinalState({
            alert: 'Ошибка создания задачи',
            titleSort: null,
            createdTimeSort: null,
            searchBy: null,
            filterBy: [],
          })
          .run())
    })

    describe('deleteTaskSaga', () => {
      const payload = { payload: { taskId: mockedTasks[0].id } }

      it('should delete the task', () =>
        expectSaga(deleteTaskSaga, payload)
          .withReducer(tasksReducer, { tasks: mockedTasks })
          .provide([[matchers.call.fn(tasksAPI.deleteTask), mockedTasks[0]]])
          .put(deleteTask(mockedTasks[0]))
          .hasFinalState({
            tasks: [mockedTasks[1]],
          })
          .run())

      it('should set deleting task error', () =>
        expectSaga(deleteTaskSaga, payload)
          .withReducer(appReducer)
          .provide([[matchers.call.fn(tasksAPI.deleteTask), throwError(new Error())]])
          .hasFinalState({
            alert: 'Ошибка удаления задачи',
            titleSort: null,
            createdTimeSort: null,
            searchBy: null,
            filterBy: [],
          })
          .run())
    })
  })

  describe('Unit tests', () => {
    describe('fetchTasksSaga', () => {
      it('should fetch tasks with subTasks', () => {
        testSaga(fetchTasksSaga)
          .next()
          .put(setTasksLoading(true))
          .next()
          .call(tasksAPI.fetchTasks)
          .next(mockedTasks)
          .put(fetchTasks(mockedTasks))
          .next()
          .put(setTasksLoading(false))
          .next()
          .all([
            call(fetchSubTasksSaga, { payload: { taskId: mockedTasks[0].id } }),
            call(fetchSubTasksSaga, { payload: { taskId: mockedTasks[1].id } }),
          ])
          .next()
          .isDone()
      })

      it('should fetch tasks without subtasks when response is empty', () => {
        testSaga(fetchTasksSaga)
          .next()
          .put(setTasksLoading(true))
          .next()
          .call(tasksAPI.fetchTasks)
          .next()
          .put(fetchTasks())
          .next()
          .put(setTasksLoading(false))
          .next()
          .isDone()
      })
    })

    describe('createTaskSaga', () => {
      it('should create a task and fetch subtasks', () => {
        testSaga(createTaskSaga)
          .next()
          .call(tasksAPI.createTask)
          .next(task)
          .put(createTask(task))
          .next(task)
          .call(fetchSubTasksSaga, { payload: { taskId: task.id } })
          .next()
          .isDone()
      })
    })

    describe('deleteTaskSaga', () => {
      const payload = { payload: { taskId: task.id } }

      it('should delete the task', () => {
        testSaga(deleteTaskSaga, payload)
          .next()
          .call(tasksAPI.deleteTask, task.id)
          .next(task)
          .put(deleteTask(task))
          .next()
          .isDone()
      })
    })
  })
})
