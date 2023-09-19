import { Button, Stack, Typography } from '@mui/material';
import React from 'react';


export const Pagination = ({ onNextPage, onPrevPage, currentPage = 1, lastPage, style }) => {
    return (
        <>
            <Stack {...style}>
                <Button variant="contained" disabled={currentPage === 1} onClick={onPrevPage} sx={{ alignItems: 'center' }}>Trang trước</Button>
                <Typography sx={{ alignItems: 'center' }}>{currentPage}</Typography>
                <Button variant="contained" disabled={currentPage === lastPage} onClick={onNextPage} sx={{ alignItems: 'center' }}>Trang sau</Button>
            </Stack>
        </>
    );
}