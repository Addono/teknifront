import React from 'react'

import TransitionSelector, { Transitions } from './TransitionSelector'
import BrightnessSelector from './BrightnessSelector'
import CircularColorPicker from './CircularColorPicker'
import Color from '../interfaces/Color'
import State from '../interfaces/State'

interface ILightControllerProps {
  brightness?: number
  updateBrightness: (brightness: number) => void
  state: State
  updateColor: (color: Color) => void
  updateTransition: (transition: string) => void
}

const LightController = ({
  brightness,
  updateBrightness,
  state,
  updateTransition,
  updateColor,
}: ILightControllerProps) => {
  // Get the current transition state either as one of the known Transitions, or if it is unknown as null
  const transition: Transitions | null =
    state.transition in Transitions ? Transitions[state.transition as keyof typeof Transitions] : null

  return (
    <>
      <TransitionSelector setTransition={updateTransition} transition={state.transition} />
      <br />
      <BrightnessSelector brightness={brightness ?? 0} setBrightness={updateBrightness} />
      <br />
      {transition && ![Transitions.thermal_cycle, Transitions.christmas].includes(transition) && (
        <CircularColorPicker
          color={state.params ?? { red: 0, blue: 0, green: 0 }}
          onColorChange={updateColor}
        />
      )}
    </>
  )
}

export default LightController
