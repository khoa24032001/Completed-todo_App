import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ROOT_URL } from '../../../configs/app';



function convertTodos2($todos) {
    const listTodos = $todos.data;
    const todoListLastPage = $todos.meta.last_page;
    return { listTodos, todoListLastPage };
}
let param;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: ROOT_URL }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (params) => {
                param = params
                return {
                    url: '/todos',
                    method: "GET",
                    params
                }
            },
            transformResponse: response => {
                const listTodos = convertTodos2(response)
                return listTodos
            },
            providesTags: ['Todos'],
        }),
        // getTodoById: builder.query({
        //     query: (id) => ({
        //         url: `/todos/${id}`,
        //         method: "GET",
        //     }),
        //     // transformResponse: response => {
        //     //     const todo = response
        //     //     return todo.data.data
        //     // },
        //     providesTags: ["Todos"],
        // }),
        createTodo: builder.mutation({
            query: (params) => ({
                url: '/todos',
                method: "POST",
                params,
            }),
            // invalidatesTags: ['Todos'],
            async onQueryStarted({ params }, { queryFulfilled, dispatch }) {
                await queryFulfilled
                dispatch(apiSlice.util.updateQueryData('getTodos', param, (data) => {
                    data.listTodos = [params, ...data?.listTodos]
                    return data
                })
                )
            }
        }),
        updateTodo: builder.mutation({
            query: ({ id, params }) => {
                return {
                    url: `/todos/${id}`,
                    method: "PUT",
                    params,
                }
            },
            // invalidatesTags: ['Todos'],
            async onQueryStarted({ id, params: updatedTodo }, { queryFulfilled, dispatch }) {
                await queryFulfilled
                dispatch(apiSlice.util.updateQueryData('getTodos', param, (data) => {
                    data.listTodos = data?.listTodos.map((todo) => {
                        if (todo.id === id) return { ...todo, ...updatedTodo }
                        return todo;
                    })
                }))
            }
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",

            }),
            // invalidatesTags: ['Todos'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(apiSlice.util.updateQueryData('getTodos', param, (todos) => {
                    todos.listTodos = todos?.listTodos.filter((todo) => {
                        return todo.id !== id
                    });
                })
                );
            },
        })
    })
});


export const { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = apiSlice