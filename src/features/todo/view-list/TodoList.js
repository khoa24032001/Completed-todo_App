import React, { useMemo, useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { Container, Stack, } from "@mui/material";
import { Loading } from "../../../components/loadingPage";
import { Pagination } from "../../../components/pagination";
import { deleteTodoAsync, getTodos, getTodosAsync, updateTodoAsync } from "../../../services/todo/todo-service";
import useToggle from "../../../hooks/useToggle";
import { getColor } from "../../../services/todo/color-service";
import DeleteTodoDialog from "../dialogs/DeleteTodoDialog";
import EditTodoDialog from "../dialogs/EditTodoDialog";



export const TodoList = ({ todos, onChangeTodos, isAdding, isFiltering, onChangeFiltering, selectedColor, selectedStatus, selectedSort }) => {
  const [currentTodo, setCurrentTodo] = useState(null)
  const [colors, setColors] = useState([]);
  useEffect(() => {
    getColor(handleLoadColorSuccess, handleLoadColorError)
  }, []);

  const handleLoadColorSuccess = (data) => {
    setColors(data);
  }
  const handleLoadColorError = (error) => {
    console.error('Lỗi khi gọi color API:', error);
  }
  // const handleParams = ({ params, selectedColor, selectedStatus, selectedSort }) => {
  //   if (selectedColor) params.colors = selectedColor
  //   if (selectedStatus) params.status = selectedStatus
  //   if (selectedSort) params.sortBy = selectedSort
  // }


  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [isAdding, setIsAdding] = useState(false);

  const { toggle: openDeleteDial, handleOpen: handleOpenDelete, handleClose: handleCloseDeleteDial } = useToggle()
  const { toggle: openEditDial, handleOpen: handleOpenEdit, handleClose: handleCloseEditDial } = useToggle()

  // cach 1 (getTodo)
  // useEffect(() => {
  //   const params = { page: currentPage, sortBy: "dateDesc", status: "all" }
  //   if (selectedColor) params.colors = selectedColor
  //   if (selectedStatus) params.status = selectedStatus
  //   if (selectedSort) params.sortBy = selectedSort
  //   getTodos(params, handleLoadTodoSuccess, handleLoadTodoError)
  // }, [currentPage, selectedColor, selectedStatus, selectedSort]);

  // const handleLoadTodoSuccess = (data) => {
  //   onChangeTodos(data.data);
  //   setLastPage(data.meta.last_page);
  //   setIsLoading(false);
  //   onChangeFiltering(false);
  // }
  // const handleLoadTodoError = (error) => {
  //   console.error('Lỗi khi gọi API:', error);
  //   setIsLoading(false);
  // }

  // cach 2 (test getTodosAsync)

  useEffect(() => {
    const params = { page: currentPage, sortBy: "dateDesc", status: "all" }
    if (selectedColor) params.colors = selectedColor
    if (selectedStatus) params.status = selectedStatus
    if (selectedSort) params.sortBy = selectedSort

    // Sử dụng getTodosAsync thay thế cho getTodos
    getTodosAsync(params)
      .then(data => {
        if (data instanceof Error) {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi gọi API:', data);
        } else {
          // Xử lý dữ liệu thành công
          onChangeTodos(data.data);
          setLastPage(data.meta.last_page);
          onChangeFiltering(false);
        }
      })
      .finally(() => {
        // Dừng hiển thị loading sau khi xử lý xong (thành công hoặc thất bại)
        setIsLoading(false);
        // onChangeFiltering(false);
      });
  }, [currentPage, selectedColor, selectedStatus, selectedSort]);




  function handleDeleteTodo(todo) {
    setCurrentTodo(todo)
    handleOpenDelete()
  }
  // Cach 1 delete
  const handleDeleteSuccess = (todoId) => {
    const updatedTodos = [...todos].filter(todo => todo.id !== todoId);
    setIsDeleting(false);
    onChangeTodos(updatedTodos)
  }

  const handleDeleteError = (error) => {
    console.error('Lỗi khi gọi API xóa todo:', error);
    setIsDeleting(false);
  }

  // Cach 2 delete
  function onClickDelete(todoId) {
    setIsDeleting(true)
    deleteTodoAsync(todoId)
      .then(data => {
        if (data instanceof Error) {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi gọi API xóa todo:', data);
        } else {
          // Xóa dữ liệu todo thành công
          const updatedTodos = [...todos].filter(todo => todo.id !== todoId);
          onChangeTodos(updatedTodos);
        }
      })
      .finally(() => {
        // Dừng hiển thị loading sau khi xử lý xong (thành công hoặc thất bại)
        setIsDeleting(false);
      });
  }


  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setIsLoading(true);
    }
  };


  function handleUpdateTodo(todo) {
    setCurrentTodo(todo)
    handleOpenEdit()
  }
  // Cach 1 update
  const handleUpdateSuccess = (todoId, data) => {
    // console.log(data)
    const updatedTodos = [...todos].map(todo => (todo.id === todoId ? data : todo));
    onChangeTodos(updatedTodos);
    setIsEditing(false)
  }

  const handleUpdateError = (error) => {
    console.error('Lỗi khi gọi update todo API:', error);
    setIsEditing(false)
  }

  // Cach 2 update
  function onClickUpdate(todoId, params) {
    setIsEditing(true)
    updateTodoAsync(todoId, params)
      .then(data => {
        if (data instanceof Error) {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi gọi update todo API :', data);
        } else {
          // Xóa dữ liệu todo thành công
          const updatedTodos = [...todos].map(todo => (todo.id === todoId ? data : todo));
          onChangeTodos(updatedTodos);
        }
      })
      .finally(() => {
        // Dừng hiển thị loading sau khi xử lý xong (thành công hoặc thất bại)
        setIsEditing(false);
      });
  }


  const listTodo = useMemo(() => {
    return todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={handleDeleteTodo}
        onUpdate={handleUpdateTodo}
      />
    ))
  }, [todos]);

  const showLoading = isLoading || isDeleting || isEditing || isAdding || isFiltering

  return (
    <>
      <Stack position={"relative"}>
        {showLoading && (
          <>
            <Loading sx={{
              my: 0,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }} />
          </>
        )}
        <Container maxWidth="md" sx={{ height: '75vh', overflow: 'auto', ...showLoading && { opacity: 0.3 } }}>
          {listTodo}
        </Container>

        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          style={{
            sx: {
              display: 'flex', flexDirection: 'row',
              justifyContent: 'space-around', alignContent: "center",
              ...showLoading && { opacity: 0.3 }
            }
          }}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </Stack>
      {openDeleteDial && <DeleteTodoDialog
        open={openDeleteDial}
        todo={currentTodo}
        handleClose={handleCloseDeleteDial}
        //Cach 1
        handleDeleteError={handleDeleteError}
        handleDeleteSuccess={handleDeleteSuccess}
        setIsDeleting={() => setIsDeleting(true)}
        //Cach 2
        onClickDelete={onClickDelete} />}

      {openEditDial && <EditTodoDialog
        open={openEditDial}
        todo={currentTodo}
        colors={colors}
        handleClose={handleCloseEditDial}
        //Cach 1
        handleUpdateError={handleUpdateError}
        handleUpdateSuccess={handleUpdateSuccess}
        setIsEditing={() => setIsEditing(true)}
        //Cach 2 
        onClickUpdate={onClickUpdate}
      />}
    </>

  );
};



