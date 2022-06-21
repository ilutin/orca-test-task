import { all, call, put, takeEvery, select } from 'redux-saga/effects'
import * as subTasksAPI from 'api/subTasks'
import { fetchSubTasks, deleteSubTask } from 'store/reducers/subTasksReducer'
import { setAlert } from 'store/reducers/appReducer'
import { selectSubTaskByTaskId } from 'store/selectors'
import { deleteTaskSaga } from '.'

export function* fetchSubTasksSaga({ payload }) {
  try {
    const response = yield call(subTasksAPI.fetchSubTasks, payload.taskId)

    yield put(fetchSubTasks({ taskId: payload.taskId, subtasks: response }))
  } catch (e) {
    yield put(setAlert('Ошибка загрузки подзадач'))
  }
}

export function* deleteSubTaskSaga({ payload }) {
  try {
    const response = yield call(subTasksAPI.deleteSubTask, payload.subTaskId)

    yield put(deleteSubTask(response))
    // const subTasks = yield select(state => state.subtasks.subtasks[response.taskId])
    const subTasks = yield select(state =>
      selectSubTaskByTaskId(state, { taskId: response.taskId }),
    )

    if (!subTasks.length) {
      yield call(deleteTaskSaga, { payload: { taskId: response.taskId } })
    }
  } catch (e) {
    yield put(setAlert('Ошибка удаления подзадачи'))
  }
}

export default function* subTasksSagaWatcher() {
  yield all([
    takeEvery('FETCH_SUBTASKS_SAGA', fetchSubTasksSaga),
    takeEvery('DELETE_SUBTASK_SAGA', deleteSubTaskSaga),
  ])
}
