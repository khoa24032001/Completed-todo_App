import React from 'react'
import { ExDialog } from '../../../components/dialog';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ColorTag } from '../../../components/colorTag';
import { getColorStatus, getNameStatus } from '../../../utils/helper';


export const ViewDetailDialog = ({ todo, open, onClose }) => {
    const { text: content, color, completed: status } = todo
    const { id, name: colorName } = color ?? {}
    // const { toggle: isOpenViewDial, handleOpen, handleClose } = useToggle()

    return (
        <ExDialog open={open} onClose={onClose}>
            <ExDialog.Header title='View your todo' onClose={onClose} />
            <ExDialog.Body>
                <Typography gutterBottom sx={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between' }} component='div'>
                    <Box sx={{ display: "flex" }}>
                        Content:
                        <Typography fontWeight={'bold'} paddingLeft={'7px'} component='div'>
                            {content}
                        </Typography>
                    </Box>
                    {colorName ? <ColorTag color={colorName} /> : <ColorTag color={"None"} />}
                    <Box sx={{ display: "flex" }}>
                        Status:
                        <Typography color={getColorStatus(status)} paddingLeft={'7px'} component='div'>
                            {getNameStatus(status)}
                        </Typography>
                    </Box>
                </Typography>
            </ExDialog.Body>
            <ExDialog.Footer>
                <Stack spacing={2} direction="row">
                    <Button autoFocus sx={{ color: "blue" }} onClick={onClose}>
                        Return
                    </Button>
                </Stack>
            </ExDialog.Footer>
        </ExDialog>
    )
}
