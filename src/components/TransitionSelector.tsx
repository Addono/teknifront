import React from 'react'

import { Radio } from 'antd'

interface ITransitionSelectorProps {
  setTransition: (transition: string) => void
  transition: string
}

export enum Transitions {
  'fade' = 'Fade',
  'sudden' = 'Sudden',
  'thermal_cycle' = 'Thermal Cycle',
  'wipe' = 'Wipe',
  'christmas' = 'Christmas',
}

const TransitionSelector = ({ setTransition, transition }: ITransitionSelectorProps) => (
  <Radio.Group
    value={transition}
    onChange={({ target: { value } }) => setTransition(value)}
    style={{ whiteSpace: 'unset' }}
  >
    {Object.entries(Transitions).map(([id, name]) => (
      <Radio.Button value={id} key={id}>
        {name}
      </Radio.Button>
    ))}
  </Radio.Group>
)

export default TransitionSelector
