import * as React from 'react';
import ChipCom, { ChipProps } from '@mui/material/Chip';

interface ChipP extends Omit<ChipProps, 'backgroundColor' | 'color'> {
    backgroundColor: any;
    color?: string;
}

export default function Chip({ backgroundColor, color, ...restProps }: ChipP) {
    return (
        <ChipCom
            style={{ "minWidth": "100px", "height": "25px", "flexShrink": "0", "textAlign": "center", "fontSize": "14px", "fontStyle": "normal", "fontWeight": "700", "lineHeight": "normal", backgroundColor, color: color || "#FFF" }}
            {...restProps} />
    );
}
