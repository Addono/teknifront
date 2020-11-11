import React from 'react'

import { Col, Row } from 'antd'

import BrightnessSlider from './BrightnessSlider'
import BrightnessButton from './BrightnessButton'

interface IBrightnessSelectorProps {
  brightness: number
  setBrightness: (brightness: number) => void
}

const BrightnessSelector = ({ brightness, setBrightness }: IBrightnessSelectorProps) => {
  return (
    <Row style={{ width: '100%', padding: '0.5em' }}>
      <Col flex="inherit" data-test-id={'brightness-button-off'}>
        <BrightnessButton setBrightness={setBrightness} brightness={brightness} value={0}>
          Off
        </BrightnessButton>
      </Col>
      <Col flex="auto" style={{ padding: '0 1em 0 1em' }}>
        <BrightnessSlider setBrightness={setBrightness} brightness={brightness} />
      </Col>
      <Col flex="inherit" data-test-id={'brightness-button-on'}>
        <BrightnessButton setBrightness={setBrightness} brightness={brightness} value={1}>
          Max
        </BrightnessButton>
      </Col>
    </Row>
  )
}

export default BrightnessSelector
