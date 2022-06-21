import { createBrowserHistory } from 'history'
import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { appReducer, tasksReducer, subTasksReducer } from './reducers'

const history = createBrowserHistory()

const reducer = combineReducers({
  router: connectRouter(history),
  app: appReducer,
  tasks: tasksReducer,
  subtasks: subTasksReducer,
})

export { history }

export default reducer
