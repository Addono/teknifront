import React, { useState } from 'react'
import logo from '../logo.svg'
import mqtt, {IClientPublishOptions} from 'mqtt'
import SetBrightnessButton from "../components/SetBrightnessButton"
import Switch from "../components/Switch"
import Color from "../interfaces/Color";
import CircularColorPicker from "../components/CircularColorPicker";

interface ITogglePageProps {
}

const MQTT_OPTIONS: IClientPublishOptions = { qos: 2, retain: true }


const TogglePage: React.FC<ITogglePageProps> = (props) => {
    const [client, setClient] = useState<mqtt.MqttClient>()
    const [state, setState] = useState<{brightness: number} | null>(null)

    React.useEffect(() => {
        let client = mqtt.connect('wss://test.mosquitto.org:8081')

        client.on('connect', function () {
            client.subscribe('tek/staging/light/1/#')
            setClient(client)
        })
    }, [])

    React.useEffect(() => {
        client && client.on('message', (topic, message: string) => {
            setState(JSON.parse(message))
        })
    }, [client])

    const setBrightness = (brightness: number): void => {
        const message = {brightness}
        client && client.publish('tek/staging/light/1/brightness', JSON.stringify(message), MQTT_OPTIONS)
    }

    const setColor = (color: Color) => {
        const message = {transition: "fade", params: color}
        client && client.publish('tek/staging/light/1/state', JSON.stringify(message), MQTT_OPTIONS)
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{client ? "Connected" : "Not connected"}</p>
                <p>Brightness: {state ? state.brightness : "Loading..."}</p>
                <Switch
                    isOn={state && state.brightness === 1}
                    handleToggle={() => state !== null && setBrightness(state.brightness === 1 ? 0.0 : 1.0)}
                />
                <CircularColorPicker onColorChange={setColor} />
            </header>
        </div>
    )


}

export default TogglePage
