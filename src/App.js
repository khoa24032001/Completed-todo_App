import React from "react";
import { Stack } from '@mui/material'
import { AppHeader, AppContent, AppFooter } from "./components/app";
import TodoFilter from "./features/todo/view-list/TodoFilter";
import { AddTodoButton } from "./features/todo/dialogs/AddTodoButton";
import TodoList from "./features/todo/view-list/TodoList"; // dùng function



function App() {

  return (
    <div className="App">
      <AppHeader title="TodoApp" renderActions={() => {
        return (
          <AddTodoButton
            labelBtn='Add'
            styleBtn={{ variant: 'outlined', sx: { color: '' } }}
          />
        )
      }} />
      <AppContent
        contentRender={() => {
          return (
            <Stack>
              <TodoFilter />
              <TodoList />
            </Stack>
          );
        }}
      />
      <AppFooter />
    </div>
  );
}

export default App;
