import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  subtasks: {},
  labels: [],
}

const subTasksReducer = createSlice({
  name: 'subtasks',
  initialState,
  reducers: {
    fetchSubTasks(state, { payload }) {
      const { taskId, subtasks } = payload
      const labels = subtasks.reduce((acc, subtask) => acc.concat(subtask.labels), [])

      return {
        ...state,
        subtasks: {
          ...state.subtasks,
          [taskId]: subtasks,
        },
        labels: [...new Set([...state.labels, ...labels])],
      }
    },
    deleteSubTask(state, { payload }) {
      if (payload) {
        const filteredSubTasks = state.subtasks[payload.taskId].filter(
          subtask => subtask.id !== payload.id,
        )

        state.subtasks[payload.taskId] = filteredSubTasks
      }
    },
  },
})

export const { fetchSubTasks, deleteSubTask } = subTasksReducer.actions
export default subTasksReducer.reducer
