import * as React from 'react'

import { Radio } from 'antd'

interface ITransitionSelectorProps {
  setTransition: (transition: string) => void,
  transition: string,
}

export enum Transitions {
  "fade" = "Fade",
  "sudden" = "Sudden",
  "thermalCycle" = "Thermal Cycle"
}

const TransitionSelector: React.FC<ITransitionSelectorProps> = ({ setTransition, transition }) => (
  <Radio.Group value={transition} onChange={({ target: { value } }) => setTransition(value)}>
    {Object.entries(Transitions).map(([id, name]) =>
      <Radio.Button value={id} key={id}>{name}</Radio.Button>
    )}
  </Radio.Group>
)

export default TransitionSelector
