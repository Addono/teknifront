import React, { useState } from 'react'
import mqtt, { IClientPublishOptions } from 'mqtt'
import Switch from "../components/Switch"
import Color from '../interfaces/Color'
import CircularColorPicker from "../components/CircularColorPicker"
import BarLoader from 'react-spinners/BarLoader'

interface ITogglePageProps {
}

const MQTT_OPTIONS: IClientPublishOptions = { qos: 2, retain: true }

const TogglePage: React.FC<ITogglePageProps> = () => {
    const [client, setClient] = useState<mqtt.MqttClient>()
    const [brightness, setBrightness] = useState<{ brightness: number } | null>(null)
    const [state, setState] = useState<{ transition: string, params: Color }>()

    React.useEffect(() => {
        let client = mqtt.connect('wss://test.mosquitto.org:8081')

        client.on('connect', function () {
            client.subscribe('tek/staging/light/1/#')
            setClient(client)
        })
    }, [])

    React.useEffect(() => {
        client && client.on('message', (topic: string, message: string) => {
            if (topic.endsWith("brightness")) {
                setBrightness(JSON.parse(message))
            } else if (topic.endsWith("state")) {
                setState(JSON.parse(message))
            }
        })
    }, [client])

    const sendBrightness = (brightness: number): void => {
        const message = { brightness }
        client && client.publish('tek/staging/light/1/brightness', JSON.stringify(message), MQTT_OPTIONS)
    }

    const sendColor = (color: Color) => {
        const message = { transition: "fade", params: color }
        client && client.publish('tek/staging/light/1/state', JSON.stringify(message), MQTT_OPTIONS)
            && setState(message)
    }

    return (
        <div className="App">
            <header className="App-header">
                {!client ?
                    <>
                        <BarLoader
                            color={'#09d3ac'}
                        />
                        <p>Connecting...</p>
                    </>
                    :
                    <>
                        <CircularColorPicker
                            color={state ? state.params : { red: 0, blue: 0, green: 0 }}
                            onColorChange={sendColor}
                        />
                        <br />
                        <Switch
                            isOn={brightness && brightness.brightness === 1}
                            handleToggle={() => brightness !== null && sendBrightness(brightness.brightness === 1 ? 0.0 : 1.0)}
                        />
                    </>
                }
            </header>
        </div>
    )


}

export default TogglePage
