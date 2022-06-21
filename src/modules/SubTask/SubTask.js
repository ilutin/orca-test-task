import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Checkbox, Text } from 'components/atoms'
import { TagList } from 'components/molecules'
import { Flex } from 'components/templates'
import { SubTaskStyled, DeleteDismissStyled } from './SubTask.styles'

const SubTask = ({ subTask }) => {
  const dispatch = useDispatch()
  const { id: subTaskId, title, labels } = subTask
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteSubTask = useCallback(() => {
    dispatch({
      type: 'DELETE_SUBTASK_SAGA',
      payload: {
        subTaskId,
      },
    })

    setIsDeleting(true)
  }, [dispatch, subTaskId])

  return (
    <SubTaskStyled hide={isDeleting}>
      <Flex justify="center" align="center">
        <Checkbox />
        <Text strike={isDeleting}>{title}</Text>
      </Flex>
      <Flex direction="row" align="center" justify="center" gap="8px">
        <TagList tags={labels} />
        <DeleteDismissStyled size="24" onClick={deleteSubTask} />
      </Flex>
    </SubTaskStyled>
  )
}

const areEqual = (prevProps, nextProps) => prevProps.subTask.id === nextProps.subTask.id

SubTask.propTypes = {
  subTask: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default React.memo(SubTask, areEqual)
