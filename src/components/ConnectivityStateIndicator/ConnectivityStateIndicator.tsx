import React from 'react'

import OnlineIndicator from './OnlineIndicator'
import OfflineIndicator from './OfflineIndicator'

// @ts-ignore
import { Offline, Online } from 'react-detect-offline'

interface IConnectivityStateIndicatorProps {}

const ConnectivityStateIndicator: React.FC<IConnectivityStateIndicatorProps> = () => (
  <>
    <Online>
      <OnlineIndicator />
    </Online>
    <Offline>
      <OfflineIndicator />
    </Offline>
  </>
)

export default ConnectivityStateIndicator
