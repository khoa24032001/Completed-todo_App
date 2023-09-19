import React, { useState } from "react";
import { Stack } from '@mui/material'
import { AppHeader, AppContent, AppFooter } from "./components/app";
import { TodoFilter } from "./features/todo/view-list/TodoFilter";
import { AddTodoButton } from "./features/todo/dialogs/AddTodoButton";
import { TodoList } from "./features/todo/view-list/TodoList";



function App() {
  const [todos, setTodos] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);




  return (
    <div className="App">
      <AppHeader title="TodoApp" renderActions={() => {
        return (
          <AddTodoButton
            labelBtn='Add'
            styleBtn={{ variant: 'outlined', sx: { color: '' } }}
            todos={todos}
            onChangeTodos={data => setTodos(data)}
            onChangeAdding={data => setIsAdding(data)}
          />
        )
      }} />
      <AppContent
        contentRender={() => {
          return (
            <Stack>
              <TodoFilter
                onChangeFiltering={data => setIsFiltering(data)}
                onChangeColor={data => setSelectedColor(data)}
                onChangeStatus={data => setSelectedStatus(data)}
                onChangeSort={data => setSelectedSort(data)}
              />
              <TodoList
                todos={todos}
                isAdding={isAdding}
                isFiltering={isFiltering}
                selectedColor={selectedColor}
                selectedStatus={selectedStatus}
                selectedSort={selectedSort}
                onChangeTodos={data => setTodos(data)}
                onChangeFiltering={data => setIsFiltering(data)}
              />
            </Stack>
          );
        }}
      />
      <AppFooter />
    </div>
  );
}

export default App;
