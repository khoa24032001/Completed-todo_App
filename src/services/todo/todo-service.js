import { addData, deleteData, getData, updateData } from '../query';

export function getTodos(params, onSuccess, onError) {
    getData('/todos', params).then(response => {
        const data = response.data;
        onSuccess?.(data);
    }).catch(error => {
        onError?.(error);
    });
}


export function deleteTodo(id, onSuccess, onError, isDeleting) {
    isDeleting(true);
    deleteData(`/todos/${id}`).then(response => {
        const todoId = response.data.data.id;
        onSuccess?.(todoId);
    }).catch(error => {
        onError?.(error);
    });
}

export function updateTodo(id, params, onSuccess, onError, isEditing) {
    isEditing(true);
    updateData(`/todos/${id}`, params).then(response => {
        const todoId = response.data.data.id;
        const newTodos = response.data.data;
        onSuccess?.(todoId, newTodos);
    }).catch(error => {
        onError?.(error);
    });
}

export function addTodo(params, onSuccess, onError, isAdding) {
    isAdding(true);
    addData(`/todos`, params).then(response => {
        const newTodos = response.data.data;
        onSuccess?.(newTodos);
    }).catch(error => {
        onError?.(error);
    });
}




