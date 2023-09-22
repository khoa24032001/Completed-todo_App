import { addData, deleteData, getData, updateData } from '../query';

export function getTodos(params, onSuccess, onError) {
    getData('/todos', params).then(response => {
        const data = response.data;
        onSuccess?.(data);
    }).catch(error => {
        onError?.(error);
    });
}

function convertTodos($todos) {
    return $todos;
}

export async function getTodosAsync(params) {
    try {
        const response = await getData('/todos', params)
        // convert data
        return convertTodos(response.data);
    } catch (error) {
        // get errors and return 
        // console.log('Lỗi khi gọi API:', error)
        return error
    }
}

// export function getTodos(params, onSuccess, onError) {
//     try {
//         const response = getData('/todos', params).then((res) => {
//             const data = convertTodos(response.data);
//             onSuccess?.(data);
//         })
//     } catch (error) {
//         onError?.(error);
//     }
// }



// export function deleteTodo(id, onSuccess, onError, isDeleting) {
//     isDeleting(true);
//     deleteData(`/todos/${id}`).then(response => {
//         const todoId = response.data.data.id;
//         onSuccess?.(todoId);
//     }).catch(error => {
//         onError?.(error);
//     });
// }

export async function deleteTodo(id, onSuccess, onError, onStarted) {
    onStarted();
    console.log(id)
    try {
        const response = await deleteData(`/todos/${id}`)
        const todoId = response.data.data.id;
        onSuccess?.(todoId);
    } catch (error) {
        onError?.(error);
    }
}

export async function deleteTodoAsync(id) {
    try {
        const response = await deleteData(`/todos/${id}`)
        const todoId = response.data.data.id;
        return todoId;
    } catch (error) {
        // get errors and return 
        return error
    }
}

// export function deleteTodo(id, onSuccess, onError, onStarted = null) {

//     try {
//         onStarted?.(true);
//         const response = deleteData(`/todos/${id}`).then((res) => {
//             const todoId = response.data.data.id;
//             onSuccess?.(todoId);
//         }).then((error) => {
//             onError?.(error);
//         })

//     }
// }

// export function updateTodo(id, params, onSuccess, onError, isEditing) {
//     isEditing(true);
//     updateData(`/todos/${id}`, params).then(response => {
//         const todoId = response.data.data.id;
//         const newTodos = response.data.data;
//         onSuccess?.(todoId, newTodos);
//     }).catch(error => {
//         onError?.(error);
//     });
// }

export async function updateTodo(id, params, onSuccess, onError, onStarted) {
    onStarted();
    try {
        const response = await updateData(`/todos/${id}`, params)
        const todoId = response.data.data.id;
        const newTodo = response.data.data;
        onSuccess?.(todoId, newTodo);
    } catch (error) {
        onError?.(error);
    }
}

export async function updateTodoAsync(id, params) {
    try {
        const response = await updateData(`/todos/${id}`, params)
        const newTodo = response.data.data;
        return newTodo;
    } catch (error) {
        // get errors and return 
        return error
    }
}

// export function addTodo(params, onSuccess, onError, isAdding) {
//     isAdding(true);
//     addData(`/todos`, params).then(response => {
//         const newTodos = response.data.data;
//         onSuccess?.(newTodos);
//     }).catch(error => {
//         onError?.(error);
//     });
// }

export async function addTodo(params, onSuccess, onError, onStarted) {
    onStarted();
    try {
        const response = await addData(`/todos`, params)
        const newTodo = response.data.data;
        onSuccess?.(newTodo);
    } catch (error) {
        onError?.(error);
    }
}

export async function addTodoAsync(params) {
    try {
        const response = await addData('/todos', params)
        const newTodo = response.data.data;
        return newTodo
    } catch (error) {
        // get errors and return 
        return error
    }
}




