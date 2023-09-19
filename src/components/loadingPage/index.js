import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

export const Loading = ({ sx }) => {
    return (
        <Box sx={{ height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', my: '5em', ...sx }}>

            <CircularProgress size={60} disableShrink sx={{ my: '1em' }} />

            <Typography fontWeight={"bold"}>Please wait for data to load</Typography>
        </Box>
    )
}