import React, {useState} from 'react';
// @ts-ignore
import ColorPicker from '@radial-color-picker/react-color-picker';
import '@radial-color-picker/react-color-picker/dist/react-color-picker.umd.min.css';
import Color from "../interfaces/Color";
import {hsl, rgb} from 'color-convert'

interface IState {
    hue: number,
    saturation: number,
    luminosity: number,
}

interface ICircularColorPickerProps {
    onColorChange: (color: Color) => void,
    color: Color,
}

const colorPickerStateToColor = ({hue, saturation, luminosity}: IState): Color => {
    const [red, green, blue] = hsl.rgb([hue, saturation, luminosity])
    return {red: red / 255, green: green / 255, blue: blue / 255}
}

const colorToColorPickerState = ({red, green, blue}: Color): IState => {
    const [hue, saturation, luminosity] = rgb.hsl([red * 255, green * 255, blue * 255])
    return {hue, saturation: saturation, luminosity: luminosity}
}

const CircularColorPicker: React.FC<ICircularColorPickerProps> = ({onColorChange, color}) => {
    const [lastSelectedColor, setLastSelectedColor] = useState<Color>(color)

    const {hue} = colorToColorPickerState(color)

    return (
        <ColorPicker
            hue={hue}
            onSelect={() => onColorChange(lastSelectedColor)}
            onChange={(iState: IState) => {setLastSelectedColor(colorPickerStateToColor(iState))}}
        />
    )
}


export default CircularColorPicker