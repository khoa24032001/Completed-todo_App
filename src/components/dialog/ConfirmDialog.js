import { Button, Typography } from '@mui/material';
import { ExDialog } from '../../components/dialog';
import React from 'react';



export const ConfirmDialog = ({ open, confirmTitle, content, onConfirm, actions, onClose, ...props }) => {
    function handleConfirm() {
        // auto close
        onConfirm?.();
        onClose();
    }

    return (
        <ExDialog
            open={open}
            onClose={onClose}>
            <ExDialog.Header
                title={confirmTitle}
                onClose={onClose}
            />
            <ExDialog.Body>
                <Typography>{content}</Typography>
            </ExDialog.Body>
            <ExDialog.Footer>
                {
                    actions.map((action, idx) => {
                        return (
                            <>
                                {action.action === 'confirm' ?
                                    (<Button key={idx} onClick={handleConfirm} {...action.style}>
                                        {action.title}
                                    </Button>) : (
                                        <Button key={idx} onClick={onClose} {...action.style}>
                                            {action.title}
                                        </Button>
                                    )
                                }
                            </>
                        )
                    })
                }
            </ExDialog.Footer>
        </ExDialog>
    );
};