import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import TransitionSelector, { Transitions } from './TransitionSelector'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('<TransitionSelector />', () => {
  it("Renders the 'fade' transition button", () => {
    // Create an insteance of TransitionSelector
    const { queryByLabelText, getByLabelText } = render(
      <TransitionSelector transition={Transitions.fade} setTransition={jest.fn()} />
    )

    expect(queryByLabelText(/fade/i)).toBeTruthy()
  })

  it("Renders the 'sudden' transition button", () => {
    // Create an insteance of TransitionSelector
    const { queryByLabelText, getByLabelText } = render(
      <TransitionSelector transition={Transitions.fade} setTransition={jest.fn()} />
    )

    expect(queryByLabelText(/sudden/i)).toBeTruthy()
  })

  it("Allows selecting the 'sudden' transition", () => {
    // Mock the setTransition callback
    const setTransition = jest.fn()

    // Create an insteance of TransitionSelector
    const { getByLabelText } = render(
      <TransitionSelector transition={Transitions.fade} setTransition={setTransition} />
    )

    fireEvent.click(getByLabelText(/sudden/i))

    expect(setTransition).toBeCalledWith('sudden')
  })

  it("Allows selecting the 'fade' transition", () => {
    // Mock the setTransition callback
    const setTransition = jest.fn()

    // Create an insteance of TransitionSelector
    const { getByLabelText } = render(
      <TransitionSelector transition={Transitions.sudden} setTransition={setTransition} />
    )

    fireEvent.click(getByLabelText(/fade/i))

    expect(setTransition).toBeCalledWith('fade')
  })
})
