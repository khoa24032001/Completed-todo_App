import DialogContent from '@mui/material/DialogContent';
import React from 'react';

export const DialogBody = ({ children }) => {
  return (
    <DialogContent dividers>
      {children}
    </DialogContent>
  );
}