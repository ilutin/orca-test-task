import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Text } from 'components/atoms'
import { Flex } from 'components/templates'
import { selectFilteredTasks } from 'store/selectors'
import Task from '../Task/Task'

const Tasks = () => {
  const dispatch = useDispatch()
  const tasksLoading = useSelector(state => state.tasks.loading)
  const filteredTasks = useSelector(selectFilteredTasks)

  useEffect(() => {
    dispatch({ type: 'FETCH_TASKS_SAGA' })
  }, [dispatch])

  if (tasksLoading) {
    return (
      <Flex justify="center" align="center" h-100>
        <Spinner />
      </Flex>
    )
  }

  if (!filteredTasks.length) {
    return (
      <Flex justify="center" align="center" h-100>
        <Text size="20px">Список задач пуст</Text>
      </Flex>
    )
  }

  return filteredTasks.map(task => <Task key={task.id} id={task.id} title={task.title} />)
}

export default Tasks
