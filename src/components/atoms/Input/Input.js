import React from 'react'
import PropTypes from 'prop-types'

const Input = React.forwardRef(({ placeholder, type, onChange }, ref) => (
  <input type={type} placeholder={placeholder} onChange={onChange} ref={ref} />
))

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: null,
}

export default Input
