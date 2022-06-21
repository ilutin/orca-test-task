import React from 'react'
import { Link } from 'react-router-dom'
import { Flex } from 'components/templates'
import { routes } from 'config/routes'
import { NotFoundStyled } from './NotFound.styles'

const NotFound = () => (
  <NotFoundStyled>
    <Flex direction="column" justify="center" align="center" h-100>
      <h1>Страница не найдена</h1>
      <Link to={routes.root()}>Перейти на главную</Link>
    </Flex>
  </NotFoundStyled>
)

export default NotFound
