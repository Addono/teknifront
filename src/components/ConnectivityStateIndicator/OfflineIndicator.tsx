import React from 'react'

import { Tooltip, Icon } from 'antd'

const OfflineIndicator: React.FC = () => (
    <Tooltip title="You appear to be offline">
        <Icon type="disconnect" style={{ color: "orangered" }} />
    </Tooltip>
)

export default OfflineIndicator
