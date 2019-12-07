import React from 'react'
import './App.css'
import ControlPage from './pages/ControlPage'
import { Layout, Typography, Row, Col } from 'antd'

const App: React.FC = () => (
  <Layout>
    <div className="App">
      <header className="App-header">
        <Row>
          <Col span={8}>
            <img src={require('./logo.png')} />
          </Col>

          <Col span={16}>
            <Typography.Title>Teknifront</Typography.Title>
          </Col>
        </Row>
      </header>
      <Row>
        <ControlPage />
      </Row>
    </div>
  </Layout >
)

export default App
