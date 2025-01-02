'user client'
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider, Grid } from '@mui/material';

const ITEM_HEIGHT = 100;

interface LongMenuProps {
  options: any
  handleOptions?: any
}

export default function LongMenu({ options, handleOptions }: LongMenuProps) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // handleOptions()

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Grid
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        <MoreVertIcon />
      </Grid>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '28ch',
          },
        }}
      >
        {options.map((option: any, index: number) => {
          return (
            <>
              <MenuItem key={option.id} selected={option === 'Pyxis'}
                onClick={() => {
                  handleClose();
                  handleOptions(option);
                }}

                style={{ color: option.color }}
              >
                <span className='px-2'>{option.icon ? option.icon : ""}</span>{option.title ? option.title : option}
              </MenuItem>
              {option.line ? <Divider /> : ""}
            </>
          )
        })}
      </Menu>
    </div>
  );
}