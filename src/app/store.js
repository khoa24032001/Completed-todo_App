import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './redux/todos/todoSlice';
import { fetchTodos } from './redux/todos/todoThunk';

const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fetchTodos),
});

export default store;