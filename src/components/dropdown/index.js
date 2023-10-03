import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types'


export const Dropdown = ({
    options,
    name,
    sx,
    defaultValue,
    value,
    onChange }) => {
    return (
        <>
            <Box sx={{ maxWidth: '200px', flex: 1, ...sx }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                    <Select labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={name}
                        defaultValue={defaultValue}
                        value={value}
                        onChange={onChange}
                    >

                        {options.map((item, idx) => {
                            return (<MenuItem
                                key={idx}
                                value={item.title}>{item.title}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
}


Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
}