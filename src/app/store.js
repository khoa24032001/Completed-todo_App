import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './redux/todos/todoSlice';
import filterReducer from './redux/filter/filterSlice';
import { apiSlice } from './redux/api/apiSlice';


// Redux
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// Redux toolkit
const store = configureStore({
    reducer: {
        todo: todoReducer,
        filter: filterReducer,

        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;