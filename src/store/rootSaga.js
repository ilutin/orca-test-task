import { all } from 'redux-saga/effects'
import { tasksSagaWatcher, subTasksSagaWatcher } from './sagas'

export default function* () {
  yield all([tasksSagaWatcher(), subTasksSagaWatcher()])
}
