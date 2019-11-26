import React from 'react';

interface ISetBrightnessButtonProps {
    brightness: number,
    setBrightness?: (brightness: number) => void,
}

const SetBrightnessButton: React.FunctionComponent<ISetBrightnessButtonProps> = (props: ISetBrightnessButtonProps) => {
    return (
        <p>{props.brightness}</p>
    )
}

export default SetBrightnessButton