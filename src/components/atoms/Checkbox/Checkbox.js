import React, { useState, useCallback } from 'react'
import { CheckboxStyled } from './Checkbox.styles'

const Checkbox = props => {
  const [checked, setChecked] = useState(false)

  const onClick = useCallback(() => {
    setChecked(!checked)
  }, [checked])

  return <CheckboxStyled {...props} role="checkbox" checked={checked} onClick={onClick} />
}

export default Checkbox
