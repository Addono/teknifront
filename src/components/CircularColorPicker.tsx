import React, {useState} from 'react';
// @ts-ignore
import ColorPicker from '@radial-color-picker/react-color-picker';
import '@radial-color-picker/react-color-picker/dist/react-color-picker.umd.min.css';
// @ts-ignore
import converter from 'hsl-to-rgb-for-reals'
import Color from "../interfaces/Color";

interface IState {
    hue: number,
    saturation: number,
    luminosity: number,
}

interface ICircularColorPickerProps {
    onColorChange: (color: Color) => void,
    color?: Color,
}

const CircularColorPicker: React.FC<ICircularColorPickerProps> = ({onColorChange}) => {
    const [state, setState] = useState()

    return (
        <ColorPicker
            {...state}
            onSelect={({hue, saturation, luminosity}: IState) => {
                const [red, green, blue] = converter(hue, saturation / 100, luminosity / 100).map((c: number) => c / 256)
                onColorChange({red, green, blue})
            }}
            onChange={setState}
        />
    )
}


export default CircularColorPicker