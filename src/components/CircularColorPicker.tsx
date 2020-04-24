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
  const [lastSelectedColor, setLastSelectedColor] = useState<Color>(color)

  const hue = colorToHue(color)

  return (
    <ColorPicker
      hue={hue}
      onChange={() => onColorChange(lastSelectedColor)}
      onInput={(hue: number) => {
        setLastSelectedColor(hueToColor(hue))
      }}
    />
  )
}

export default CircularColorPicker
