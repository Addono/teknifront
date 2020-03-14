import React from 'react'

import { Tooltip } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

const OnlineIndicator = () => (
  <Tooltip title="You're online">
    <CheckCircleOutlined style={{ color: 'lawngreen' }} />
  </Tooltip>
)

export default OnlineIndicator
