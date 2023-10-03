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
import { getTodosAsync, deleteTodoAsync, updateTodoAsync, addTodoAsync } from "../../../services/todo/todo-service"



export const listTodosLoading = () => {
    return {
        type: LIST_TODOS_LOADING
    }
}



export const fetchTodosSuccess = (todos) => {
    return {
        type: FETCH_TODOS_SUCCESS,
        payload: todos
    }
}

export const fetchTodosFailure = error => {
    return {
        type: FETCH_TODOS_FAILURE,
        payload: error
    }
}



export const addTodoSuccess = (todo, id) => {
    return {
        type: ADD_TODO_SUCCESS,
        payload: { todo, id }
    }
}

export const addTodoFailure = error => {
    return {
        type: ADD_TODO_FAILURE,
        payload: error
    }
}



export const deleteTodoSuccess = (todoId) => {
    return {
        type: DELETE_TODO_SUCCESS,
        payload: todoId
    }
}

export const deleteTodoFailure = error => {
    return {
        type: DELETE_TODO_FAILURE,
        payload: error
    }
}



export const updateTodoSuccess = (todo, id) => {
    return {
        type: UPDATE_TODO_SUCCESS,
        payload: { todo, id }
    }
}

export const updateTodoFailure = error => {
    return {
        type: UPDATE_TODO_FAILURE,
        payload: error
    }
}

export const fetchTodos = (params) => {
    return async (dispatch) => {
        await dispatch(listTodosLoading())
        getTodosAsync(params)
            .then(data => {
                // console.log(data)
                if (data instanceof Error) {
                    dispatch(fetchTodosFailure(data))
                } else {
                    dispatch(fetchTodosSuccess(data))
                }
            });
    }
}

export const addNewTodo = (params) => {
    return async (dispatch) => {
        await dispatch(listTodosLoading())
        addTodoAsync(params)
            .then(data => {
                // console.log(data)
                if (data instanceof Error) {
                    dispatch(addTodoFailure(data))
                } else {
                    dispatch(addTodoSuccess(data?.newTodo, data?.todoId))
                }
            });
    }
}

export const removeTodo = (id) => {
    return async (dispatch) => {
        await dispatch(listTodosLoading())
        deleteTodoAsync(id)
            .then(data => {
                if (data instanceof Error) {
                    dispatch(deleteTodoFailure(data))
                } else {
                    dispatch(deleteTodoSuccess(data))
                }
            });
    }
}

export const changeTodo = (id, params) => {
    return async (dispatch) => {
        await dispatch(listTodosLoading())
        updateTodoAsync(id, params)
            .then(data => {
                // console.log(data)
                if (data instanceof Error) {
                    dispatch(updateTodoFailure(data))
                } else {
                    dispatch(updateTodoSuccess(data?.newTodo, data?.todoId))
                }
            });
    }
}