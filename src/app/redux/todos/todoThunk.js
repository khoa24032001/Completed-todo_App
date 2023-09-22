import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    try {
        const response = await axios.get('https://example-api.com/todos'); // Thay URL API thực tế ở đây
        return response.data;
    } catch (error) {
        throw error;
    }
});