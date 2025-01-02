import React, { useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { SketchPicker } from 'react-color';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ColorBox from '../Colorbox/Colorbox';

interface ColorObject {
  color: string;
  check: boolean;
}

interface ColorSelectorProps {
  colorData: ColorObject[];
  setColorsArray: React.Dispatch<React.SetStateAction<ColorObject[]>>;
  color: string
  setColor: any;
  custom?: boolean;
}

const Colorselector: React.FC<ColorSelectorProps> = ({ colorData, color, setColorsArray, setColor, custom = false }) => {

  //custom selected
  const [customSelected, setCustomSelected] = useState(custom);

  const [fillColors, setFillColors] = useState<string[]>(colorData.map((color) => color.color));

  const handleColorChange = (index: number, text:string) => {
    const newColors = colorData.map((item, i) => ({
      ...item,
      check: i === index,
    }));
    setFillColors(newColors.map((color) => color.color));
    setColorsArray(newColors)

    setCustomSelected(false);
  };

  const handleChange = (updatedColor: any) => {
    setColor(updatedColor.hex);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  const handleCustomSelected = () => {
    const newColors = colorData.map((item, i) => ({
      ...item,
      check: false,
    }));
    setFillColors(newColors.map((color) => color.color));
    setColorsArray(newColors)


    setCustomSelected(true);
  };

  return (
    <>

      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          width: "12rem"
        }}
      >
        {colorData.map((item, index) => (
          <ColorBox
            key={index}
            color={fillColors[index]}
            isSelected={item.check}
            onClick={() => handleColorChange(index, item.color)}
          />
        ))}

      </Grid>

      <div className="flex items-center">
        <ColorBox color={color} isSelected={customSelected} onClick={handleCustomSelected} />
        <Button variant="contained" onClick={handleButtonClick} style={{ width: 150 }}>Custom Color</Button>
      </div>


      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SketchPicker color={color} onChange={handleChange} />
      </Popover  >
    </>
  );
};

export default Colorselector;
