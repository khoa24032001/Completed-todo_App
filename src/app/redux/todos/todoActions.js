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
    // getTodosAsync(params)
    // return async (dispatch) => {
    //     await dispatch(listTodosLoading())
    //     getData('/todos', params).then(response => {
    //         console.log(response);
    //         const todos = response.data
    //         dispatch(fetchTodosSuccess(todos))
    //     })
    //         .catch(error => {
    //             dispatch(fetchTodosFailure(error.message))
    //         })
    // }
    return async (dispatch) => {
        await dispatch(listTodosLoading())
        getTodosAsync(params)
            .then(data => {
                // console.log(data)
                if (data instanceof Error) {
                    // Xử lý lỗi nếu có
                    dispatch(fetchTodosFailure(data))
                } else {
                    // Xử lý dữ liệu thành công
                    dispatch(fetchTodosSuccess(data))
                }
            });
    }
}

export const addNewTodo = (params) => {
    return async (dispatch) => {
        await dispatch(listTodosLoading())
        // addData('/todos', params).then(response => {
        //     console.log(response.data.data)
        //     const todo = response.data?.data
        //     console.log('addNewTodo', todo);
        //     dispatch(addTodoSuccess(todo))
        // })
        //     .catch(error => {
        //         dispatch(addTodoFailure(error.message))
        //     })
        addTodoAsync(params)
            .then(data => {
                // console.log(data)
                if (data instanceof Error) {
                    // Xử lý lỗi nếu có
                    dispatch(addTodoFailure(data))
                } else {
                    // Xử lý dữ liệu thành công
                    dispatch(addTodoSuccess(data?.newTodo, data?.todoId))
                }
            });
    }
}

export const removeTodo = (id) => {
    return async (dispatch) => {
        await dispatch(listTodosLoading())
        // deleteData(`/todos/${id}`).then(response => {
        //     const todoId = response.data.data.id;
        //     dispatch(deleteTodoSuccess(todoId))
        // })
        //     .catch(error => {
        //         dispatch(deleteTodoFailure(error.message))
        //     })
        deleteTodoAsync(id)
            .then(data => {
                // console.log(data)
                if (data instanceof Error) {
                    // Xử lý lỗi nếu có
                    dispatch(deleteTodoFailure(data))
                } else {
                    // Xử lý dữ liệu thành công
                    dispatch(deleteTodoSuccess(data))
                }
            });
    }
}

export const changeTodo = (id, params) => {
    return async (dispatch) => {
        await dispatch(listTodosLoading())
        // updateData(`/todos/${id}`, params).then(response => {
        //     const newTodo = response.data.data;
        //     const todoId = response.data.data.id;
        //     dispatch(updateTodoSuccess(newTodo, todoId))
        // })
        //     .catch(error => {
        //         dispatch(updateTodoFailure(error.message))
        //     })
        updateTodoAsync(id, params)
            .then(data => {
                // console.log(data)
                if (data instanceof Error) {
                    // Xử lý lỗi nếu có
                    dispatch(updateTodoFailure(data))
                } else {
                    // Xử lý dữ liệu thành công
                    dispatch(updateTodoSuccess(data?.newTodo, data?.todoId))
                }
            });
    }
}