import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types'

// const options = [
//     { value: 1, title: "Khoa " },
//     { value: 2, title: "Tan" },
// ]
// const colors = [
//     { value: 1, title: "Khoa " },
//     { value: 2, title: "Tan" },
// ]

// function convertColorToOptions(colors) {
//     return colors.map((color) => {
//         return { value: color.id, title: color.name };
//     });
// }


export const Dropdown = ({
    options,
    name,
    // keyName = "id",
    // valuePropName = "name",
    // getValue = (item) => item.value,
    // getTitle = (item) => item.title,
    sx,
    defaultValue,
    value,
    onChange }) => {
    //  
    // Lam the nao ha Anh DAnh ??
    // Co giai phap
    // C1: format gia tri nhan vao
    // C2: Truyen vao ham de thuc hien lay value va lay key tu item;

    // C3:Truyen vao cach de render 1 view item 

    // key
    // function itemRender(item) {

    // }
    // // 
    // function handleChange(value){
    //     const found = options.find(o => o[keyName] === value);
    //     onChange(found)
    // }
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
                                // key={item.id}
                                // La cai Todo
                                key={idx}
                                value={item.title}>{item.title}</MenuItem>)
                            // value={item[keyName]}>{getTitle(item)}</MenuItem>)
                            // value={getValue(item)}>{getTitle(item)}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
}

// export const Dropdown = ({ options, name, sx, defaultValue, value, onChange }) => {

//     return (
//         <>
//             <Box sx={{ maxWidth: '200px', flex: 1, ...sx }}>
//                 <FormControl fullWidth>
//                     <InputLabel id="demo-simple-select-label">{name}</InputLabel>
//                     <Select labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         label={name}
//                         defaultValue={defaultValue}
//                         value={value}
//                         onChange={onChange}
//                     >


//                         {options.map((item, idx) => {
//                             return (<MenuItem key={item.id} value={item.value}>{item.name}</MenuItem>)
//                         })}
//                     </Select>
//                 </FormControl>
//             </Box>
//         </>
//     );
// }

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
}