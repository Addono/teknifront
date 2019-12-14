import * as React from 'react'

import { Radio } from 'antd'

interface ITransitionSelectorProps {
  setTransition: (transition: string) => void,
  transition: string,
}

export enum Transitions {
  "fade" = "Fade",
  "sudden" = "Sudden",
  "thermal_cycle" = "Thermal Cycle",
  "wipe" = "Wipe",
  "christmas" = "Christmas"
}

const TransitionSelector: React.FC<ITransitionSelectorProps> = ({ setTransition, transition }) => (
  <Radio.Group value={transition} onChange={({ target: { value } }) => setTransition(value)}>
    {Object.entries(Transitions).map(([id, name]) =>
      <Radio.Button value={id} key={id}>{name}</Radio.Button>
    )}
  </Radio.Group>
)

export default TransitionSelector
