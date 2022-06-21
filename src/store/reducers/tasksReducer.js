import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  tasks: [],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksLoading(state, action) {
      state.loading = action.payload
    },
    fetchTasks(state, action) {
      return {
        ...state,
        tasks: action.payload,
      }
    },
    createTask(state, action) {
      state.tasks.push(action.payload)
    },
    deleteTask(state, { payload }) {
      state.tasks = state.tasks.filter(task => task.id !== payload.id)
    },
  },
})

export const { setTasksLoading, fetchTasks, createTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer
