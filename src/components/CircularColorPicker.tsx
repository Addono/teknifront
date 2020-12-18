import React, { useState } from 'react'

import '@radial-color-picker/react-color-picker/dist/react-color-picker.min.css'
import './CircularColorPicker.css'

// @ts-ignore
import ColorPicker from '@radial-color-picker/react-color-picker'
import Color from '../interfaces/Color'
import { hsl, rgb } from 'color-convert'

interface ICircularColorPickerProps {
  onColorChange: (color: Color) => void
  color: Color
}

const hueToColor = (hue: number): Color => {
  const [red, green, blue] = hsl.rgb([hue, 100, 50])
  return { red: red / 255, green: green / 255, blue: blue / 255 }
}

const colorToHue = ({ red, green, blue }: Color): number => {
  const [hue] = rgb.hsl([red * 255, green * 255, blue * 255])
  return hue
}

const CircularColorPicker = ({ onColorChange, color }: ICircularColorPickerProps) => {
  // Contains the currently selected color when the user is giving their input,
  // else it is undefined while the user it not selecting any color.
  const [temporarySelectedColor, setTemporarilySelectedColor] = useState<Color | undefined>(undefined)

  return (
    <ColorPicker
      hue={colorToHue(temporarySelectedColor ?? color)}
      onChange={(hue) => {
        // Notify parent components that the color is changed
        onColorChange(hueToColor(hue))

        // Give control back to the
        setTemporarilySelectedColor(undefined)
      }}
      onInput={(hue) => setTemporarilySelectedColor(hueToColor(hue))}
      variant={'persistent'}
    />
  )
}

export default CircularColorPicker
