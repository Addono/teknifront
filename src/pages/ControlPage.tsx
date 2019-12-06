import React, {useState} from 'react'
import mqtt, {IClientPublishOptions} from 'mqtt'
import Color from '../interfaces/Color'
import CircularColorPicker from "../components/CircularColorPicker"
import BarLoader from 'react-spinners/BarLoader'
import BrightnessSlider from '../components/BrightnessSlider'
import TransitionSelector from '../components/TransitionSelector'

type Message = { transition: string, params: Color }

const MQTT_OPTIONS: IClientPublishOptions = {qos: 2, retain: true}

const ControlPage: React.FC = () => {
    const [client, setClient] = useState<mqtt.MqttClient>()
    const [brightness, setBrightness] = useState<{ brightness: number } | null>(null)
    const [state, setState] = useState<Message>()

    React.useEffect(() => {
        let client = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

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

    const updateColor = (color: Color) => {
        sendStateUpdateMessage({
            transition: state?.transition || "fade",
            params: color,
        })
    }

    const updateTransition = (transition: string) => {

        sendStateUpdateMessage({
            transition,
            params: state?.params || {red: 1, blue: 1, green: 1},
        })
    }

    const sendStateUpdateMessage = (message: Message) => {
        client && client.publish('tek/staging/light/1/state', JSON.stringify(message), MQTT_OPTIONS)
        && setState(message)
    }

    const sendBrightness = (brightness: number) => {
        const message = {brightness}
        client && client.publish('tek/staging/light/1/brightness', JSON.stringify(message), MQTT_OPTIONS)
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
                        <TransitionSelector setTransition={updateTransition} transition={state ? state.transition : "None"}/>
                        <br/>
                        <div style={{width: "90%", maxWidth: "15em"}}>
                            <BrightnessSlider
                                brightness={(brightness && brightness.brightness) || 0}
                                setBrightness={sendBrightness}
                            />
                        </div>
                        <br/>
                        {state?.transition !== "thermalCycle" &&
                            <CircularColorPicker
                                color={state ? state.params : {red: 0, blue: 0, green: 0}}
                                onColorChange={updateColor}
                            />
                        }
                    </>
                }
            </header>
        </div>
    )


}

export default ControlPage
