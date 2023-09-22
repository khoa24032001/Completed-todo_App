import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        setTodos: (state, action) => {
            return action.payload;
        },
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            const updatedTodo = action.payload;
            const index = state.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                state[index] = updatedTodo;
            }
        },
    },
});

export const { setTodos, addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;