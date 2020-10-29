import React from 'react'

import './BrightnessSlider.css'

import { Slider } from 'antd'

interface IBrightnessSliderProps {
  brightness: number
  setBrightness: (brightness: number) => void
}

const BrightnessSlider = ({ brightness, setBrightness }: IBrightnessSliderProps) => {
  // When the user is moving the slider, we overwrite the brightness using this state variable until
  // the user releases the handle. It will be null when the value is not overwritten.
  const [overwrittenBrightness, setOverwrittenBrightness] = React.useState<number | null>(null)

  return (
    <Slider
      step={0.01}
      tipFormatter={(value) => `${Math.round((value ?? 0) * 100)}%`}
      max={1}
      value={overwrittenBrightness ?? brightness}
      onChange={(value: any) => typeof value === 'number' && setOverwrittenBrightness(value)}
      onAfterChange={(value: any) => {
        // Stop overwriting the brightness
        setOverwrittenBrightness(null)

        // Update the brightness
        typeof value === 'number' && setBrightness(value)
      }}
      className={'brightness-slider'}
    />
  )
}

export default BrightnessSlider
