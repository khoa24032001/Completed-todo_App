import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos, addNewTodo, removeTodo, changeTodo } from './todoThunk';

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
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false
            state.todos = action.payload.normalizedTodos
            state.todosIds = action.payload.todosIds
            state.todosLastPage = action.payload.todoListLastPage
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(addNewTodo.pending, state => {
            state.loading = true
        })
        builder.addCase(addNewTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todos = { ...action.payload.newTodo, ...state.todos }
            state.todosIds = [action.payload.todoId, ...state.todosIds]
        })
        builder.addCase(addNewTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(removeTodo.pending, state => {
            state.loading = true
        })
        builder.addCase(removeTodo.fulfilled, (state, action) => {
            const todoIdToDelete = action.payload;
            const updatedTodos = { ...state.todos }
            delete updatedTodos[todoIdToDelete]

            state.loading = false
            state.todos = updatedTodos
            state.todosIds = state.todosIds?.filter(item => item !== todoIdToDelete)
        })
        builder.addCase(removeTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(changeTodo.pending, state => {
            state.loading = true
        })
        builder.addCase(changeTodo.fulfilled, (state, action) => {
            const todoId = action.payload.todoId
            const updatedTodoData = action.payload.newTodo
            const updatedNewTodos = { ...state.todos }
            updatedNewTodos[todoId] = { ...updatedNewTodos[todoId], ...updatedTodoData }

            state.loading = false
            state.todos = updatedNewTodos
        })
        builder.addCase(changeTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
});

// export const { setTodos, addTodo, deleteTodo, updateTodo, setLoading, setError } = todoSlice.actions;

export default todoSlice.reducer;

