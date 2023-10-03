import React from 'react';
import PropTypes from 'prop-types';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export const ColorTag = ({color}) => {
    return (
        <Box sx={{display: "flex"}}>
           <Typography> Color:</Typography>
            <CircleRoundedIcon sx={{color: {color}, marginX: "5px"}}/>
            <Typography> {color}</Typography>
        </Box>
    )
}

ColorTag.propTypes = {
    color: PropTypes.string.isRequired
}