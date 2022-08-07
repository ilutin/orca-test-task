import { all, call, put, takeEvery } from 'redux-saga/effects'
import * as tasksAPI from 'api/tasks'
import { fetchTasks, createTask, deleteTask, setTasksLoading } from 'store/reducers/tasksReducer'
import { setAlert } from 'store/reducers/appReducer'
import { types } from 'store/actionTypes'
import { fetchSubTasksSaga } from '.'

export function* fetchTasksSaga() {
  try {
    yield put(setTasksLoading(true))
    const response = yield call(tasksAPI.fetchTasks)

    yield put(fetchTasks(response))
    yield put(setTasksLoading(false))

    if (response?.length) {
      yield all(response.map(task => call(fetchSubTasksSaga, { payload: { taskId: task.id } })))
    }
  } catch (e) {
    yield put(setTasksLoading(false))
    yield put(setAlert('Ошибка загрузки задач'))
  }
}

export function* createTaskSaga() {
  try {
    const response = yield call(tasksAPI.createTask)

    yield put(createTask(response))
    yield call(fetchSubTasksSaga, { payload: { taskId: response.id } })
  } catch (e) {
    yield put(setAlert('Ошибка создания задачи'))
  }
}

export function* deleteTaskSaga({ payload }) {
  try {
    const response = yield call(tasksAPI.deleteTask, payload.taskId)

    yield put(deleteTask(response))
  } catch (e) {
    yield put(setAlert('Ошибка удаления задачи'))
  }
}

export default function* tasksSagaWatcher() {
  yield all([
    takeEvery(types.FETCH_TASKS_SAGA, fetchTasksSaga),
    takeEvery(types.CREATE_TASK_SAGA, createTaskSaga),
    takeEvery(types.DELETE_TASK_SAGA, deleteTaskSaga),
  ])
}
