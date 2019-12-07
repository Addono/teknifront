import React, { useState } from 'react'
import mqtt, { IClientPublishOptions } from 'mqtt'
import Color from '../interfaces/Color'
import CircularColorPicker from "../components/CircularColorPicker"
import BrightnessSlider from '../components/BrightnessSlider'
import TransitionSelector from '../components/TransitionSelector'
import { Spin, Button, notification } from 'antd'

type Message = { transition: string, params: Color }

const MQTT_OPTIONS: IClientPublishOptions = { qos: 2, retain: true }
const MQTT_CHANNEL_PREFIX = "tek/staging/light/1"

const sendStateUpdateMessage = (client: mqtt.MqttClient, message: Message) => (
    client.publish(`${MQTT_CHANNEL_PREFIX}/state`, JSON.stringify(message), MQTT_OPTIONS)
)

const sendBrightness = (client: mqtt.MqttClient, brightness: number) => (
    client.publish(`${MQTT_CHANNEL_PREFIX}/brightness`, JSON.stringify({ brightness }), MQTT_OPTIONS)
)

const createTimeoutNotification = (client: mqtt.MqttClient) => (
    notification.open({
        message: "Hmmm 🤔",
        description: "We couldn't find any previous configuration for this light.",
        key: "timeout_notification",
        duration: 0,
        btn: <Button type="primary" size="small" onClick={() => sendStateUpdateMessage(client, { transition: "fade", params: { red: 1, green: 1, blue: 1 } })}>Initialize with defaults</Button>,
    })
)

const ControlPage: React.FC = () => {
    const [client, setClient] = useState<mqtt.MqttClient>()
    const [brightness, setBrightness] = useState<{ brightness: number }>()
    const [state, setState] = useState<Message>()
    const timeoutReference = React.useRef<NodeJS.Timeout>()

    React.useEffect(() => {
        let client = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

        client.on('connect', () => {
            client.subscribe(`${MQTT_CHANNEL_PREFIX}/#`)
            setClient(client)

            timeoutReference.current = setTimeout(() => createTimeoutNotification(client), 1000)
        })

        return () => timeoutReference.current && clearTimeout(timeoutReference.current)
    }, [])

    React.useEffect(() => {
        client?.on('message', (topic: string, message: string) => {
            if (topic.endsWith("brightness")) {
                setBrightness(JSON.parse(message))
            } else if (topic.endsWith("state")) {
                setState(JSON.parse(message))

                // Clear the timeout notification and timer if it exists
                notification.close("timeout_notification")
                timeoutReference.current && clearTimeout(timeoutReference.current)
            }
        })
    }, [client])

    if (!client || !state) {
        return <Spin tip={"Connecting..."} size={"large"} />
    }

    const updateColor = (color: Color) => {
        const newState = { ...state, params: color } // Overwrite params
        sendStateUpdateMessage(client, newState) && setState(newState)
    }

    const updateTransition = (transition: string) => {
        const newState = { ...state, transition } // Overwrite transition
        sendStateUpdateMessage(client, newState) && setState(newState)
    }

    const updateBrightnesss = (brightness: number) => {
        sendBrightness(client, brightness) && setBrightness({ brightness })
    }

    return <>
        <TransitionSelector setTransition={updateTransition} transition={state.transition} />
        <br />
        <BrightnessSlider
            brightness={brightness?.brightness ?? 0}
            setBrightness={updateBrightnesss}
        />
        <br />
        {state.transition !== "thermalCycle" &&
            <CircularColorPicker
                color={state?.params ?? { red: 0, blue: 0, green: 0 }}
                onColorChange={updateColor}
            />
        }
    </>
}

export default ControlPage
