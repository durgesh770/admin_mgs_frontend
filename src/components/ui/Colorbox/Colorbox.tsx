import React from 'react';
import { Box, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface ColorBoxProps {
    color: string;
    isSelected?: boolean;
    onClick?: () => void;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, isSelected, onClick }) => {
    return (
        <Box
            sx={{
                width: '50px',
                height: '50px',
                border: '2px solid white',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: color,
            }}
            onClick={onClick}
        >
            {isSelected && (
                <Grid sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '3px'
                }}>
                    <CheckIcon />
                </Grid>
            )}
        </Box>
    );
};

export default ColorBox;
