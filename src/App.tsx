import React from 'react'
import './App.css'
import ControlPage from './pages/ControlPage'
import { Layout, Typography } from 'antd'

const App: React.FC = () => (
  <Layout>
    <div className="App">
      <header className="App-header">
        <Typography.Title>Teknifront</Typography.Title>
        <ControlPage />
      </header>
    </div>
  </Layout >
)

export default App
