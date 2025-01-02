'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import SnackbarMUI from '@mui/material/Snackbar';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useGlobal } from '@/context/GlobalContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbar() {
  const { snackbar, setSnackbar } = useGlobal();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setSnackbar({ ...snackbar, "open": false });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <SnackbarMUI

        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}

        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </SnackbarMUI>
    </Stack>
  );
}