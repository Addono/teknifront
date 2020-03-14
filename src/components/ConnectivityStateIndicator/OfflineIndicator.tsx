import React from 'react'

import { Tooltip } from 'antd'
import { DisconnectOutlined } from '@ant-design/icons'

const OfflineIndicator = () => (
  <Tooltip title="You appear to be offline">
    <DisconnectOutlined style={{ color: 'orangered' }} />
  </Tooltip>
)

export default OfflineIndicator
