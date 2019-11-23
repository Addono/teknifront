import React from 'react';
import logo from '../logo.svg';
import mqtt from 'mqtt'

interface ITogglePageProps {
}

const topic = 'tek/staging/light/1/brightness';

const TogglePage: React.FunctionComponent<ITogglePageProps> = (props) => {
    const [ client, setClient ] = React.useState<mqtt.MqttClient>()
    const [ state, setState ] = React.useState<string | null>(null)

    React.useEffect(() => {
        let client = mqtt.connect('wss://test.mosquitto.org:8081')

        client.on('connect', function() {
            client.subscribe(topic)
            setClient(client)
        })
    }, [])

    React.useEffect(() => {
        client && client.on('message', (topic, message) => {
            setState(message.toString())
        })
    }, [client])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                    <p>{ client ? "Connected" : "Not connected"}</p>
                    <p>{ state }</p>
                    <button onClick={() => client && client.publish(topic, state === '0' ? '255' : '0', { qos: 2, retain: true } )} disabled={ !client || !state }>Toggle</button>
            </header>
        </div>
    );
};

export default TogglePage;
