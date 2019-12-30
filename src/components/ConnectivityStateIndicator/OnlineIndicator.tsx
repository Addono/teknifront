import React from 'react'

import { Tooltip, Icon } from 'antd'

const OnlineIndicator: React.FC = () => (
    <Tooltip title="You're online">
        <Icon type="check-circle" style={{ color: "lawngreen" }} />
    </Tooltip>
)

export default OnlineIndicator
