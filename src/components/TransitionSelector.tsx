import * as React from 'react'

import { Radio } from 'antd'

interface ITransitionSelectorProps {
  setTransition: (transition: string) => void,
}

export enum Transitions {
  "fade" = "Fade",
  "sudden" = "Sudden",
}

const TransitionSelector: React.FC<ITransitionSelectorProps> = ({ setTransition }) => (
  <Radio.Group onChange={({target: {value}}) => setTransition(value)}>
    {Object.entries(Transitions).map(([id, name]) =>
      <Radio.Button value={id} key={id}>{name}</Radio.Button>
    )}
  </Radio.Group>
)

export default TransitionSelector
