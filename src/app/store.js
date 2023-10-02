// import { configureStore } from '@reduxjs/toolkit';
// import todosReducer from './redux/todos/todoSlice';
// import { fetchTodos } from './redux/todos/todoThunk';

// const store = configureStore({
//     reducer: {
//         todos: todosReducer,
//     },
//     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fetchTodos),
// });

// export default store;

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store