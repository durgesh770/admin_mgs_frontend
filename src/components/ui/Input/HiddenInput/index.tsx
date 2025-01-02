'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import React from 'react';
import styles from "./HiddenInput.module.css"

interface PasswordInputProps extends OutlinedInputProps {
  label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, ...restProps }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className={styles.password_input_container + ' flex flex-col '}>
      <label className='input-label'>
        {label}
      </label>


      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }

        {...restProps}
      />

    </div>
  );
};

export default PasswordInput;
