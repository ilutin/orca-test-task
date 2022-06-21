import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/button-has-type
const Button = ({ children, type }) => <button type={type}>{children}</button>

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

Button.defaultProps = {
  type: 'button',
}

export default Button
