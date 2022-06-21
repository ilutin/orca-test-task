import React from 'react'
import { DefaultTemplate, Main, Sidebar } from 'components/templates'
import { Toolbar, Content } from 'components/organisms'

const Home = () => (
  <DefaultTemplate>
    <Sidebar />

    <Main>
      <Toolbar />
      <Content />
    </Main>
  </DefaultTemplate>
)

export default Home
