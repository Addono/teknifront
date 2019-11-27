import React, { useState } from 'react'
import logo from '../logo.svg'
import mqtt, {IClientPublishOptions} from 'mqtt'
import Switch from "../components/Switch"
import Color from "../interfaces/Color";
import CircularColorPicker from "../components/CircularColorPicker";

interface ITogglePageProps {
}

const MQTT_OPTIONS: IClientPublishOptions = { qos: 2, retain: true }


const TogglePage: React.FC<ITogglePageProps> = (props) => {
    const [client, setClient] = useState<mqtt.MqttClient>()
    const [brightness, setBrightness] = useState<{brightness: number} | null>(null)

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
            }
        })
    }, [client])

    const sendBrightness = (brightness: number): void => {
        const message = {brightness}
        client && client.publish('tek/staging/light/1/brightness', JSON.stringify(message), MQTT_OPTIONS)
    }

    const sendColor = (color: Color) => {
        const message = {transition: "fade", params: color}
        client && client.publish('tek/staging/light/1/state', JSON.stringify(message), MQTT_OPTIONS)
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{client ? "Connected" : "Not connected"}</p>
                <p>Brightness: {brightness ? brightness.brightness : "Loading..."}</p>
                <Switch
                    isOn={brightness && brightness.brightness === 1}
                    handleToggle={() => brightness !== null && sendBrightness(brightness.brightness === 1 ? 0.0 : 1.0)}
                />
                <CircularColorPicker onColorChange={sendColor} />
            </header>
        </div>
    )


}

export default TogglePage
