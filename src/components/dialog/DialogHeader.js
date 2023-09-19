import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types'

export const DialogHeader = ({ onClose, title }) => {
    return (
        <>
            <DialogTitle id="customized-dialog-title"
                sx={{ m: 0, p: 2, color: 'red', fontWeight: 'bold' }}>
                {title}
            </DialogTitle>
            <IconButton aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
        </>
    )
}

DialogHeader.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}