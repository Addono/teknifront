import React, { useState } from 'react'

import mqtt, { IClientPublishOptions } from 'mqtt'
import Color from '../interfaces/Color'
import { Spin, Button, notification } from 'antd'
import LightController from '../components/LightController'
import State from '../interfaces/State'

const MQTT_OPTIONS: IClientPublishOptions = { qos: 2, retain: true }
const MQTT_CHANNEL_PREFIX = 'tek/staging/light/1'

const sendStateUpdateMessage = (client: mqtt.MqttClient, state: State) =>
  client.publish(`${MQTT_CHANNEL_PREFIX}/state`, JSON.stringify(state), MQTT_OPTIONS)

const sendBrightness = (client: mqtt.MqttClient, brightness: number) =>
  client.publish(`${MQTT_CHANNEL_PREFIX}/brightness`, JSON.stringify({ brightness }), MQTT_OPTIONS)

const createTimeoutNotification = (client: mqtt.MqttClient) =>
  notification.open({
    message: 'Hmmm 🤔',
    description: "We couldn't find any previous configuration for this light.",
    key: 'timeout_notification',
    duration: 0,
    btn: (
      <Button
        type="primary"
        size="small"
        onClick={() =>
          sendStateUpdateMessage(client, {
            transition: 'fade',
            params: { red: 1, green: 1, blue: 1 },
          })
        }
      >
        Initialize with defaults
      </Button>
    ),
  })

const ControlPage: React.FC = () => {
  const [client, setClient] = useState<mqtt.MqttClient>()
  const [brightness, setBrightness] = useState<{ brightness: number }>()
  const [state, setState] = useState<State>()
  const timeoutReference = React.useRef<NodeJS.Timeout>()

  // Connect to the MQTT server
  React.useEffect(() => {
    let client = mqtt.connect('wss://mqtt.flespi.io:443', {
      username: 'eoBHHV6b4Ck87Qy5UToKDGPlIs5Nn7uplTWQCRRwj1sgHObpxoX1SDcoT5140jk9',
    })

    client.on('connect', () => {
      client.subscribe(`${MQTT_CHANNEL_PREFIX}/#`)
      setClient(client)

      // Create the retrieve state timeout notification
      timeoutReference.current = setTimeout(() => createTimeoutNotification(client), 1000)
    })

    return () => timeoutReference.current && clearTimeout(timeoutReference.current)
  }, [])

  // Start processing the messages from the MQTT server when the connection completes
  React.useEffect(() => {
    client?.on('message', (topic: string, message: string) => {
      if (topic.endsWith('brightness')) {
        setBrightness(JSON.parse(message))
      } else if (topic.endsWith('state')) {
        setState(JSON.parse(message))

        // Clear the timeout notification and timer if it exists
        notification.close('timeout_notification')
        timeoutReference.current && clearTimeout(timeoutReference.current)
      }
    })
  }, [client])

  // Show a spinner until we are finished connecting
  if (!client || !state) {
    return <Spin tip={'Connecting...'} size={'large'} />
  }

  const updateColor = (color: Color) => {
    const newState = { ...state, params: color } // Overwrite params
    sendStateUpdateMessage(client, newState) && setState(newState)
  }

  const updateTransition = (transition: string) => {
    const newState = { ...state, transition } // Overwrite transition
    sendStateUpdateMessage(client, newState) && setState(newState)
  }

  const updateBrightness = (brightness: number) => {
    sendBrightness(client, brightness) && setBrightness({ brightness })
  }

  return (
    <LightController
      brightness={brightness?.brightness}
      updateBrightness={updateBrightness}
      state={state}
      updateColor={updateColor}
      updateTransition={updateTransition}
    />
  )
}

export default ControlPage
