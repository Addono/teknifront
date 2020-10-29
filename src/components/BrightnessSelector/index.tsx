import React from 'react'

import { Button, Col, Row } from 'antd'

import BrightnessSlider from './BrightnessSlider'

interface IBrightnessSelectorProps {
  brightness: number
  setBrightness: (brightness: number) => void
}

const BrightnessButton = ({
  value,
  children,
  setBrightness,
}: {
  value: number
  children: React.ReactNode
  setBrightness: (brightness: number) => void
}) => <Button onClick={() => setBrightness(value)}>{children}</Button>

const BrightnessSelector = ({ brightness, setBrightness }: IBrightnessSelectorProps) => {
  return (
    <Row style={{ width: '100%' }}>
      <Col flex="inherit">
        <BrightnessButton setBrightness={setBrightness} value={0}>
          Off
        </BrightnessButton>
      </Col>
      <Col flex="auto" style={{ padding: '0 1em 0 1em' }}>
        <BrightnessSlider setBrightness={setBrightness} brightness={brightness} />
      </Col>
      <Col flex="inherit">
        <BrightnessButton setBrightness={setBrightness} value={1}>
          Max
        </BrightnessButton>
      </Col>
    </Row>
  )
}

export default BrightnessSelector
