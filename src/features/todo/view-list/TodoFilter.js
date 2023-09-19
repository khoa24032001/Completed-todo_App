import React from 'react';
import Stack from "@mui/material/Stack";
// import { Dropdown } from "../../../components/dropdown";
// import { COLORS, SORT, STATUS_OPTIONS } from "../../../utils/constants";
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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

export const TodoFilter = ({ onChangeColor, onChangeStatus, onChangeSort, onChangeFiltering }) => {
    const handleColorChange = (data) => {
        onChangeColor(data);
        onChangeFiltering(true);
    }

    const handleStatusChange = (data) => {
        onChangeStatus(data);
        onChangeFiltering(true);
    }
    const handleSortChange = (data) => {
        onChangeSort(data);
        onChangeFiltering(true);
    }

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
                            // value={todo?.completed}
                            onChange={e => handleColorChange(e.target.value)}
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
                            // value={todo?.completed}
                            onChange={e => handleStatusChange(e.target.value)}
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
                            // value={todo?.completed}
                            onChange={e => handleSortChange(e.target.value)}
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