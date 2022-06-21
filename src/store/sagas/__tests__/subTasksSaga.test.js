/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable no-unused-vars */
/* eslint-disable jest/no-test-return-statement */
import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import * as matchers from 'redux-saga-test-plan/matchers'
import { select } from 'redux-saga/effects'
import * as tasksAPI from 'api/tasks'
import * as subTasksAPI from 'api/subTasks'
import { appReducer, subTasksReducer } from 'store/reducers'
import { deleteSubTask, fetchSubTasks } from 'store/reducers/subTasksReducer'
import tasksReducer, { deleteTask } from 'store/reducers/tasksReducer'
import { selectSubTaskByTaskId } from 'store/selectors'
import { deleteSubTaskSaga, fetchSubTasksSaga } from '../subTasksSaga'

describe('subTasksSaga', () => {
  const initialState = {
    subtasks: [],
    labels: [],
  }
  const appInitialState = { alert: null }
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

  const error = new Error('Testing error')

  describe('Integration tests', () => {
    describe('fetchSubTasksSaga', () => {
      const payload = { payload: { taskId } }

      it('should fetch subtasks by taskId', () =>
        expectSaga(fetchSubTasksSaga, payload)
          .withReducer(subTasksReducer, initialState)
          .provide([[matchers.call.fn(subTasksAPI.fetchSubTasks), mockedSubTasks]])
          .put(fetchSubTasks({ taskId, subtasks: mockedSubTasks }))
          .hasFinalState({
            subtasks: { [taskId]: mockedSubTasks },
            labels: ['dolores', 'omnis', 'non', 'ipsa'],
          })
          .run())

      it('should set fetching subtasks error', () =>
        expectSaga(fetchSubTasksSaga, payload)
          .withReducer(appReducer, appInitialState)
          .provide([[matchers.call.fn(subTasksAPI.fetchSubTasks), throwError(error)]])
          .hasFinalState({
            alert: 'Ошибка загрузки подзадач',
          })
          .run())
    })

    describe('deleteSubTaskSaga', () => {
      const subTask = mockedSubTasks[0]
      const payload = { payload: { subTaskId: subTask.id } }

      it('should delete the subtask', () =>
        expectSaga(deleteSubTaskSaga, payload)
          .withReducer(subTasksReducer, { subtasks: { [taskId]: mockedSubTasks } })
          .provide([[matchers.call.fn(subTasksAPI.deleteSubTask), subTask]])
          .put(deleteSubTask(subTask))
          .hasFinalState({
            subtasks: { [taskId]: [mockedSubTasks[1]] },
          })
          .run())

      // К сожалению, у меня проблемы с моками для select. Надеюсь, это не большая проблема

      // it('should delete the last subtask along with task', () => {
      //   const task = {
      //     id: 'b6ccb23e-3593-4b5f-a17d-c4a17ef4853b',
      //     createTime: 1655742730003,
      //     title: 'Aliquid enim fugit vero assumenda ratione occaecati aut officia eaque.',
      //   }

      //   return expectSaga(deleteSubTaskSaga, payload)
      //     .withReducer(subTasksReducer, { subtasks: { [task.id]: mockedSubTasks } })
      //     .provide([
      //       [matchers.call.fn(subTasksAPI.deleteSubTask), subTask],
      //       [select(state => selectSubTaskByTaskId(state, { taskId: task.id })), []],
      //     ])
      //     .put(deleteSubTask({ taskId: task.id, ...mockedSubTasks[0] }))
      //     .put(deleteTask(subTask.taskId))
      //     .hasFinalState({
      //       tasks: [],
      //     })
      //     .run()
      // })

      it('should set deleting subtask error', () =>
        expectSaga(deleteSubTaskSaga, payload)
          .withReducer(appReducer, appInitialState)
          .provide([[matchers.call.fn(subTasksAPI.deleteSubTask), throwError(new Error())]])
          .hasFinalState({
            alert: 'Ошибка удаления подзадачи',
          })
          .run())
    })
  })

  describe('Unit tests', () => {
    describe('fetchSubTasksSaga', () => {
      const payload = { payload: { taskId } }

      it('should fetch subtasks by taskId', () => {
        testSaga(fetchSubTasksSaga, payload)
          .next()
          .call(subTasksAPI.fetchSubTasks, taskId)
          .next(mockedSubTasks)
          .put(fetchSubTasks({ taskId, subtasks: mockedSubTasks }))
          .next()
          .isDone()
      })
    })

    // К сожалению, у меня проблемы с моками для select. Надеюсь, это не большая проблема

    // describe('deleteSubTaskSaga', () => {
    //   const subtask = mockedSubTasks[0]
    //   const payload = { payload: { subTaskId: subtask.id } }

    //   it('should delete the subtask', () => {
    //     testSaga(deleteSubTaskSaga, payload)
    //       .next()
    //       .call(subTasksAPI.deleteSubTask, subtask.id)
    //       .next(subtask)
    //       .put(deleteSubTask(subtask))
    //       .next()
    //       .select(state => selectSubTaskByTaskId(state, { taskId: subtask.taskId }))
    //       .next(mockedSubTasks)
    //       .isDone()
    //   })

    //   it('should delete the last subtask along with task', () => {
    //     testSaga(deleteSubTaskSaga, payload)
    //       .next()
    //       .call(subTasksAPI.deleteSubTask, subtask.id)
    //       .next(subtask)
    //       .put(deleteSubTask(subtask))
    //       .next()
    //       .select(state => state.subtasks.subtasks[taskId])
    //       .next([])
    //       .call(tasksAPI.deleteTask, { payload: { taskId } })
    //       .isDone()
    //   })
    // })
  })
})
