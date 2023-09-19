import DialogActions from '@mui/material/DialogActions';
import React from 'react'


export const DialogFooter = ({ children }) => {
    return (
        <DialogActions>
            {children}
        </DialogActions>
    );
}