const selectTodoById = (state, id) => {
    return state.todo?.todos[id];
}

// ?? todos {}
// convert to array 
const selectTodosList = (state) => {
    return state.todo?.todos;
}

const selectTodosLoading = (state) => {
    return state.todo?.loading;
}

// 
const selectTodosIds = (state) => {
    return state.todo?.todosIds;
}

const selectTodosLastPage = (state) => {
    return state.todo?.todosLastPage;
}

const selectFilterStatus = (state) => {
    return state.filter?.status;
}

const selectFilterColor = (state) => {
    return state.filter?.colors;
}

const selectFilterSortBy = (state) => {
    return state.filter
}

export { selectTodosList, selectTodosLoading, selectTodoById, selectTodosIds, selectTodosLastPage, selectFilterStatus, selectFilterColor, selectFilterSortBy }