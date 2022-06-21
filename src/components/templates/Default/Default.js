import React from 'react'
import PropTypes from 'prop-types'
import { DefaultStyled } from './Default.styles'

const Default = ({ children }) => <DefaultStyled>{children}</DefaultStyled>

Default.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Default
