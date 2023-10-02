import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: { 
        selectedColor: '', 
        selectedStatus: '', 
        selectedSort: '',
        isFiltering: false },


})