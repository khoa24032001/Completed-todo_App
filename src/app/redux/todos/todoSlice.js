import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState:
    {
        loading: false,
        todos: {},
        todosIds: [],
        todosLastPage: 0,
        error: ''
    },
    reducers: {
        fetchTodos: (state, action) => {
            state.loading = action.payload;
            state.todos = action.payload.normalizedTodos;
            state.todoIds = action.payload.todosIds;
            state.error = action.payload;
        },
        addTodo: (state, action) => {
            state.data.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.data = state.data.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            const updatedTodo = action.payload;
            const index = state.data.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.data[index] = updatedTodo;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setTodos, addTodo, deleteTodo, updateTodo, setLoading, setError } = todoSlice.actions;

export default todoSlice.reducer;

function selectTodoById(state) {
    return {}
};

export { selectTodoById } 