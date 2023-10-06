import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './redux/todos/todoSlice';
import filterReducer from './redux/filter/filterSlice';

// Redux
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// Redux toolkit
const store = configureStore({
    reducer: {
        todo: todoReducer,
        filter: filterReducer,
    },
})

export default store