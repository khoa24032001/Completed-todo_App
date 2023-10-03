import { addData, deleteData, getData, updateData } from '../query';
import { normalize, schema } from "normalizr";

export function getTodos(params, onSuccess, onError) {
    getData('/todos', params).then(response => {
        const data = response.data;
        onSuccess?.(data);
    }).catch(error => {
        onError?.(error);
    });
}

function convertTodos($todos) {
    const normalizedTodos = normalize($todos.data, [Schema]);

    const todoOriginList = normalizedTodos.entities?.todos;
    const todosIds = normalizedTodos.result;

    const todoListLastPage = $todos.meta.last_page;
    return { normalizedTodos: todoOriginList, todosIds, todoListLastPage };
}


const Schema = new schema.Entity("todos", {}, { idAttribute: 'id' });

export async function getTodosAsync(params) {
    try {
        const response = await getData('/todos', params)
        const data = convertTodos(response?.data);
        return data
    } catch (error) {
        return error
    }
}

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
        return error
    }
}

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
        const todoId = response.data.data.id;
        return { newTodo, todoId };
    } catch (error) {
        return error
    }
}

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
        const todoId = response.data.data.id;

        const newResponse = normalize(response.data, [Schema]);
        const newTodo = newResponse.entities.todos

        return { newTodo, todoId }
    } catch (error) {
        return error
    }
}




