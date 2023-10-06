import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTodoAsync, deleteTodoAsync, getTodosAsync, updateTodoAsync } from '../../../services/todo/todo-service';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await getTodosAsync(params)
        return fulfillWithValue(response)
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const addNewTodo = createAsyncThunk('todos/addNewTodos', async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await addTodoAsync(params)
        return fulfillWithValue(response)
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await deleteTodoAsync(id)
        return fulfillWithValue(response)
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const changeTodo = createAsyncThunk('todos/changeTodo', async ({ id, params }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const response = await updateTodoAsync(id, params)
        return fulfillWithValue(response)
    } catch (error) {
        return rejectWithValue(error)
    }
});