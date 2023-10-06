import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        status: '',
        colors: '',
        sortBy: '',
    },
    reducers: {
        statusChange: (state, action) => {
            state.status = action.payload
        },
        colorChange: (state, action) => {
            state.colors = action.payload
        },
        sortChange: (state, action) => {
            state.sortBy = action.payload
        }
    },


})

export const { statusChange, colorChange, sortChange } = filterSlice.actions
export default filterSlice.reducer;