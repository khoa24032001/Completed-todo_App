import {
    LIST_TODOS_LOADING,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
} from "./todoTypes"

const initialState = {
    loading: false,
    todos: {},
    todosIds: [],
    todosLastPage: 0,
    error: ''
}



const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_TODOS_LOADING:
            return {
                ...state,
                loading: true
            }
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload.normalizedTodos,
                todosIds: action.payload.todosIds,
                todosLastPage: action.payload.todoListLastPage,
                loading: false,
            }
        case FETCH_TODOS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case ADD_TODO_SUCCESS:
            const newTodo = action.payload.todo
            return {
                ...state,
                loading: false,
                todos: { ...newTodo, ...state.todos },
                todosIds: [action.payload.id, ...state.todosIds],
                error: ''
            }

        case ADD_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_TODO_SUCCESS:
            const todoIdToDelete = action.payload;
            const updatedTodos = { ...state.todos }
            delete updatedTodos[todoIdToDelete]
            return {
                ...state,
                loading: false,
                todos: updatedTodos,
                todosIds: state.todosIds?.filter(item => item !== todoIdToDelete),
                error: ''
            }
        case DELETE_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_TODO_SUCCESS:
            const todoId = action.payload.id
            const updatedTodoData = action.payload.todo
            const updatedNewTodos = { ...state.todos }
            updatedNewTodos[todoId] = { ...updatedNewTodos[todoId], ...updatedTodoData }
            return {
                ...state,
                loading: false,
                todos: updatedNewTodos,
                error: ''
            }
        case UPDATE_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export default todoReducer