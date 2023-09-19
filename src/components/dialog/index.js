import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { DialogBody } from './DialogBody';
import { DialogFooter } from './DialogFooter';
import { DialogHeader } from './DialogHeader';

const DialogStyle = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const ExDialog = ({ open, onClose, children, ...props }) => {
    return (
        <>
            <DialogStyle
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                scroll='paper'
                fullWidth
                {...props}
            >
                {children}
            </DialogStyle>
        </>
    );
}

ExDialog.Body = DialogBody
ExDialog.Footer = DialogFooter
ExDialog.Header = DialogHeader