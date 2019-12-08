import React from 'react'
import './App.css'
import ControlPage from './pages/ControlPage'
import { Layout, Typography } from 'antd'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const App: React.FC = () => (
  <Layout className="App">
    <Header className="App-header">
      <img src={require('./logo.png')} alt={""} className={"App-logo"} />
      <Title className={"App-title"}>Teknifront</Title>
    </Header>

    <Content className="App-content">
      <ControlPage />
    </Content>
  </Layout>
)

export default App
