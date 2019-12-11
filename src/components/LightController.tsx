import React from 'react'

import TransitionSelector from './TransitionSelector'
import BrightnessSlider from './BrightnessSlider'
import CircularColorPicker from './CircularColorPicker'
import Color from '../interfaces/Color'
import State from '../interfaces/State';

interface ILightControllerProps {
    brightness?: number,
    updateBrightness: (brightness: number) => void,
    state: State,
    updateColor: (color: Color) => void,
    updateTransition: (transition: string) => void,
}

const LightController: React.FunctionComponent<ILightControllerProps> = ({ brightness, updateBrightness, state, updateTransition, updateColor }) => (
    <>
        <TransitionSelector setTransition={updateTransition} transition={state.transition} />
        <br />
        <BrightnessSlider
            brightness={brightness ?? 0}
            setBrightness={updateBrightness}
        />
        <br />
        {(state.transition !== "thermalCycle" && state.transition !== "christmas") &&
            <CircularColorPicker
                color={state.params ?? { red: 0, blue: 0, green: 0 }}
                onColorChange={updateColor}
            />
        }
    </>
)

export default LightController
