import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { SubTask } from 'modules'
import { SubTasksStyled } from './SubTasks.styles'

const SubTasks = ({ taskId }) => {
  const subTasks = useSelector(state => state.subtasks.subtasks[taskId])

  if (!subTasks) return null

  return (
    <SubTasksStyled>
      {subTasks.map(subTask => (
        <SubTask key={subTask.id} subTask={subTask} />
      ))}
    </SubTasksStyled>
  )
}

SubTasks.propTypes = {
  taskId: PropTypes.string.isRequired,
}

export default SubTasks
