import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { ArrowCircleUp } from '@styled-icons/fluentui-system-filled/ArrowCircleUp'
import { ArrowCircleDown } from '@styled-icons/fluentui-system-filled/ArrowCircleDown'
import { SubTasks } from 'modules'
import { Flex } from 'components/templates'
import { StyledTask } from './Task.styles'

const Task = ({ id, title }) => {
  const [isSubTasksVisible, setIsSubTasksVisible] = useState(false)

  const showSubTasks = useCallback(
    event => {
      if (event.key && event.key !== 'Enter') return
      setIsSubTasksVisible(!isSubTasksVisible)
    },
    [isSubTasksVisible],
  )

  return (
    <StyledTask subTasksOpen={isSubTasksVisible}>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        onClick={showSubTasks}
        onKeyPress={showSubTasks}
        tabIndex="0"
        role="button"
      >
        <span>{title}</span>
        {isSubTasksVisible ? <ArrowCircleUp /> : <ArrowCircleDown />}
      </Flex>

      {isSubTasksVisible && <SubTasks taskId={id} />}
    </StyledTask>
  )
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default React.memo(Task)
