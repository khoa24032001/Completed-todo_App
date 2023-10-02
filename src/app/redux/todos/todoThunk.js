import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ROOT_URL } from '../../../configs/app';
import { setTodos, setLoading, setError } from './todoSlice';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`http://192.168.2.180:8000/api/todos`);
        dispatch(setTodos(response.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
});