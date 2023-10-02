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
    todosKey: [],
    // todos: [],
    error: ''
}



const todoReducer = (state = initialState, action) => {
    // console.log(state)
    switch (action.type) {
        case LIST_TODOS_LOADING:
            return {
                ...state,
                loading: true
            }
        case FETCH_TODOS_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                todos: action.payload,
                todosKey: action.payload.todosKey,
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
            // const todos = [];
            // todos = [...todos, newTodo] => [newTodo]
            // const newListTodo = [newTodo, ...state.todos?.data]
            return {
                loading: false,
                todos: {
                    ...state.todos,
                    normalizedTodos: { ...newTodo, ...state.todos.normalizedTodos }
                },
                // todos: {
                //     ...state.todos,
                //     data: newListTodo
                // },
                todosKey: [action.payload.id, ...state.todosKey],
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
            // const updatedTodos = state.todos?.data.filter((todo) => todo.id !== todoIdToDelete);
            // const newListTodo = [newTodo, ...state.todos?.data]
            const updatedTodos = { ...state.todos.normalizedTodos }
            delete updatedTodos[todoIdToDelete]
            return {

                loading: false,
                todos: {
                    ...state.todos,
                    normalizedTodos: updatedTodos
                },
                // todos: {
                //     ...state.todos,
                //     data: updatedTodos
                // },
                todosKey: state.todosKey?.filter(item => item !== todoIdToDelete),
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
            // const updatedNewTodos = state.todos?.data.map((todo) =>
            //     todo.id === todoId ? { ...todo, ...updatedTodoData } : todo
            // );
            const updatedNewTodos = { ...state.todos.normalizedTodos }
            updatedNewTodos[todoId] = { ...updatedNewTodos[todoId], ...updatedTodoData }
            return {
                ...state,
                loading: false,
                todos: {
                    ...state.todos,
                    normalizedTodos: updatedNewTodos
                },
                // todos: {
                //     ...state.todos,
                //     data: updatedNewTodos
                // },
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