import React from 'react'

import './App.css'

import ControlPage from './pages/ControlPage'
import { Layout, Typography } from 'antd'

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

const badges = [
  {
    href: "//gitlab.com/ioteknikringen/teknifront",
    label: "Gitlab",
    message: "MIT",
    color: "orange",
    logo: "gitlab",
  },
  {
    href: "//reactjs.org",
    label: "Using",
    message: "React",
    color: "brightgreen",
    logo: "react",
  },
  {
    href: "//www.typescriptlang.org/",
    label: "Using",
    message: "TypeScript",
    color: "blue",
    logo: "typescript",
  },
  {
    href: "//zeit.now",
    label: "Hosted on",
    message: "ZEIT Now",
    color: "darkgrey",
    logo: "zeit",
  },
]

const App: React.FC = () => (
  <Layout className="App">
    <Header className="App-header">
      <img src={require('./logo.png')} alt={""} className={"App-logo"} />
      <Title className={"App-title"}>Teknifront</Title>
    </Header>

    <Content className="App-content">
      <ControlPage />
    </Content>

    <Footer className={"App-footer"}>
      <Text>Made with ♡ by <a href={"//aknapen.nl"}>Adriaan Knapen</a> and <a href={"//andrespy.gitlab.io/"}>Andrés Prieto Yanes</a></Text>
      <br />
      {badges.map(({ href, label, message, color, logo }) => (
        <a href={href}>
          <img src={`https://img.shields.io/badge/${label}-${message}-${color}?style=for-the-badge&logo=${logo}`} alt={""} />
        </a>
      ))}
    </Footer>
  </Layout>
)

export default App
