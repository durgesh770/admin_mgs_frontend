import Colorselector from '@/components/ui/ColorSelector/Colorselector';
import React, { useEffect, useState } from 'react'

const generateUniqueColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};

const generateColorArray = (count: number, notShouldBe?: string) => {
    const colorArray = [];

    for (let i = 0; i < count; i++) {
        let color = generateUniqueColor();
        if (color != notShouldBe) {
            colorArray.push({ color, check: false });
        }
    }

    return colorArray;
};

interface ColorObject {
    color: string;
    check: boolean;
}

const ColorSelectorfeature = ({ data, setData }: {
    data?: string;
    setData?: any;
}) => {

    const initialColors: ColorObject[] = generateColorArray(12, data);

    // not custom color state
    const [colorsArray, setColorsArray] = useState<ColorObject[]>(initialColors);

    // custom color state
    const [color, setColor] = useState(data || generateUniqueColor());


    useEffect(() => {
        setData && setData(colorsArray.find((col) => col.check == true)?.color || color);
    }, [colorsArray, color]);

    return (
        <>
            <div className='pt-6' >
                <Colorselector
                    setColorsArray={setColorsArray}
                    colorData={colorsArray}
                    color={color}
                    setColor={setColor}
                    custom={Boolean(data)}
                />
            </div>
        </>
    )
}

export default ColorSelectorfeature
