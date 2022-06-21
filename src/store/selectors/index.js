import { createSelector } from '@reduxjs/toolkit'
import { stringSort, defaultSort } from 'utils/sort'

export const selectTaskId = (_, ownProps) => ownProps.taskId

export const selectTitleSort = state => state.app.titleSort

export const selectCreatedTimeSort = state => state.app.createdTimeSort

export const selectSearchBy = state => state.app.searchBy

export const selectFilterBy = state => state.app.filterBy

export const selectSubTasks = state => state.subtasks.subtasks

export const selectLabels = state => state.subtasks.labels

export const selectSubTaskByTaskId = createSelector(
  selectSubTasks,
  selectTaskId,
  (subTasks, taskId) => subTasks[taskId],
)

export const selectTasks = state => state.tasks.tasks

export const selectFoundTasks = createSelector(
  [selectTasks, selectSubTasks, selectSearchBy],
  (tasks, subTasks, searchBy) => {
    if (searchBy) {
      const tasksWithFoundSubTasks = Object.keys(subTasks).reduce((acc, key) => {
        const isSubTaskFound = subTasks[key].some(subTask => subTask.title.includes(searchBy))

        if (isSubTaskFound) return [...acc, key]

        return [...acc]
      }, [])

      return tasks.filter(
        task => task.title.includes(searchBy) || tasksWithFoundSubTasks.includes(task.id),
      )
    }

    return tasks
  },
)

export const selectSortedTasks = createSelector(
  [selectFoundTasks, selectTitleSort, selectCreatedTimeSort],
  (foundTasks, titleSort, createdTimeSort) => {
    if (titleSort) {
      return stringSort({
        items: [...foundTasks],
        condition: titleSort === 'asc',
        key: 'title',
      })
    }

    if (createdTimeSort) {
      return defaultSort({
        items: [...foundTasks],
        condition: createdTimeSort === 'asc',
        key: 'createTime',
      })
    }

    return foundTasks
  },
)

export const selectFilteredTaskIds = createSelector(
  [selectSubTasks, selectFilterBy],
  (subTasks, filterBy) => {
    if (filterBy?.length) {
      const filterSubTasks = taskId =>
        subTasks[taskId].some(subTask => subTask.labels.some(label => filterBy.includes(label)))

      return Object.keys(subTasks).filter(filterSubTasks)
    }

    return null
  },
)

export const selectFilteredTasks = createSelector(
  [selectSortedTasks, selectFilteredTaskIds],
  (sortedTasks, taskIds) => {
    if (taskIds) {
      return sortedTasks.filter(task => taskIds.includes(task.id))
    }

    return sortedTasks
  },
)
