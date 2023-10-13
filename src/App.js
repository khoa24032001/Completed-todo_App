import React, { useState } from "react";
import { Stack } from '@mui/material'
import { AppHeader, AppContent, AppFooter } from "./components/app";
import TodoFilter from "./features/todo/view-list/TodoFilter";
import { AddTodoButton } from "./features/todo/dialogs/AddTodoButton";
import TodoList from "./features/todo/view-list/TodoList"; // dùng function



function App() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="App">
      <AppHeader title="TodoApp" renderActions={() => {
        return (
          <AddTodoButton
            labelBtn='Add'
            styleBtn={{ variant: 'outlined', sx: { color: '' } }}
            onChangeAdding={data => setIsAdding(data)}
          />
        )
      }} />
      <AppContent
        contentRender={() => {
          return (
            <Stack>
              <TodoFilter />
              <TodoList isAdding={isAdding} />
            </Stack>
          );
        }}
      />
      <AppFooter />
    </div>
  );
}

export default App;
