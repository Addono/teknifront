import React from 'react'
import { cleanup, fireEvent, render, queryByRole } from '@testing-library/react'
import BrightnessSlider from './BrightnessSlider'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('<BrigtnessSlider />', () => {
  it('Renders the slider', () => {
    const { container } = render(<BrightnessSlider brightness={100} setBrightness={jest.fn()} />)

    expect(container).toMatchSnapshot()
  })

  it('Emits setBrightness update on mouse select', () => {
    // Mock setBrightness
    const setBrightness = jest.fn()

    const { getByRole } = render(<BrightnessSlider brightness={1} setBrightness={setBrightness} />)

    const slider = getByRole(/slider/i)

    fireEvent.mouseDown(slider)
    fireEvent.mouseUp(slider)

    expect(setBrightness).toBeCalledWith(0)
  })
})
