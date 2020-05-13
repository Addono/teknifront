import React, { Suspense } from 'react'

import './App.css'

import { Layout, Typography, Collapse, Spin } from 'antd'

const ConnectivityStateIndicator = React.lazy(() =>
  import('./components/ConnectivityStateIndicator/ConnectivityStateIndicator')
)
const ControlPage = React.lazy(() => import('./pages/ControlPage'))

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

const badges = [
  {
    href: '//gitlab.com/ioteknikringen/teknifront',
    label: 'Gitlab',
    message: 'MIT',
    color: 'orange',
    logo: 'gitlab',
  },
  {
    href: '//reactjs.org',
    label: 'Using',
    message: 'React',
    color: 'brightgreen',
    logo: 'react',
  },
  {
    href: '//www.typescriptlang.org/',
    label: 'Using',
    message: 'TypeScript',
    color: 'blue',
    logo: 'typescript',
  },
  {
    href: '//vercel.com',
    label: 'Hosted on',
    message: 'Vercel',
    color: 'darkgrey',
    logo: 'vercel',
  },
]

const App = () => (
  <Layout className="App">
    <Header className="App-header">
      <img src={require('./logo.png')} alt={''} className={'App-logo'} />
      <Title className={'App-title'}>TekniFront</Title>

      <div className="App-header-right">
        <Suspense fallback={null}>
          <ConnectivityStateIndicator />
        </Suspense>
      </div>
    </Header>

    <Content className="App-content">
      <Suspense fallback={<Spin tip={'Loading...'} size={'large'} />}>
        <ControlPage />
      </Suspense>
    </Content>

    <Footer className={'App-footer'}>
      <Collapse bordered={false} expandIconPosition={'right'}>
        <Collapse.Panel
          header={
            <Text>
              Made with ♡ by <a href={'//aknapen.nl'}>Adriaan Knapen</a> and{' '}
              <a href={'//andrespy.gitlab.io/'}>Andrés Prieto Yanes</a>
            </Text>
          }
          key={1}
        >
          {badges.map(({ href, label, message, color, logo }) => (
            <a href={href} key={href}>
              <img
                src={`https://img.shields.io/badge/${label}-${message}-${color}?style=for-the-badge&logo=${logo}`}
                alt={''}
              />
            </a>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Footer>
  </Layout>
)

export default App
