import React from 'react'

import { Button } from 'antd'

interface IBrightnessButtonProps {
  brightness: number
  setBrightness: (brightness: number) => void
  value: number
  children: React.ReactNode
}

const BrightnessButton = ({ value, children, brightness, setBrightness }: IBrightnessButtonProps) => {
  // Highlight the button when the brightness set by this button
  // is the current brightness
  const highlightButton: boolean = brightness === value

  return (
    <Button onClick={() => setBrightness(value)} type={highlightButton ? 'primary' : 'default'} ghost>
      {children}
    </Button>
  )
}

export default BrightnessButton
