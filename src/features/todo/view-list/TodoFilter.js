import React from 'react';
import Stack from "@mui/material/Stack";
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { connect } from 'react-redux';
import { statusChange, colorChange, sortChange } from '../../../app/redux/filter/filterActions';

const FILTER_COLOR = [
    { id: 0, value: '', name: "Not filter" },
    { id: 1, value: "green", name: "Green" },
    { id: 2, value: "blue", name: "Blue" },
    { id: 3, value: "orange", name: "Orange" },
    { id: 4, value: "purple", name: "Purple" },
    { id: 5, value: "red", name: "Red" },
];

const FILTER_STATUS = [
    { id: 0, value: '', name: "Not filter" },
    { id: 1, value: "completed", name: "Completed" },
    { id: 2, value: "active", name: "Incomplete" },
    { id: 3, value: "deleted", name: "Deleted" },
];

const FILTER_SORT = [
    { id: 0, value: '', name: "Not filter" },
    { id: 1, value: "nameAsc", name: "Name from A to Z" },
    { id: 2, value: "nameDesc", name: "Name from Z to A" },
    { id: 3, value: "dateAsc", name: "From Oldest" },
    { id: 4, value: "dateDesc", name: "From Newest" },
];

const TodoFilter = ({ statusChange, colorChange, sortChange }) => {

    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xl: "center" }}
            justifyContent="space-between"
            spacing={{ xs: 2, xl: 0 }}
            width={1}
            maxWidth="md"
            margin="0 auto"
            sx={{ px: { xs: 1, md: 2 }, py: 2 }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "stretch" }}
                spacing={{ xs: 1, sm: 2 }}
                flexGrow={1}
            >

                <Box sx={{ maxWidth: '200px', flex: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{"Color"}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={"Color"}
                            defaultValue={""}
                            // value={todo?.completed}
                            onChange={e => colorChange(e.target.value)}
                        >
                            {FILTER_COLOR.map((item) => {
                                return (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ maxWidth: '200px', flex: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{"Status"}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={"Status"}
                            defaultValue={""}
                            // value={todo?.completed}
                            onChange={e => statusChange(e.target.value)}
                        >
                            {FILTER_STATUS.map((item) => {
                                return (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Box>

            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={{ xs: 1, md: 2 }}
                flexGrow={1}
            >
                <Box sx={{ maxWidth: '200px', flex: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{"Sort by"}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={"Sort by"}
                            defaultValue={""}
                            // value={todo?.completed}
                            onChange={e => sortChange(e.target.value)}
                        >
                            {FILTER_SORT.map((item) => {
                                return (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
        </Stack>
    );
}

const mapStateToProps = state => {
    return {
        status: state.filter?.status,
        colors: state.filter?.colors,
        sortBy: state.filter?.sortBy
    }
}

const mapDispatchToProps = dispatch => {
    return {
        statusChange: (params) => dispatch(statusChange(params)),
        colorChange: (params) => dispatch(colorChange(params)),
        sortChange: (params) => dispatch(sortChange(params))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(TodoFilter)