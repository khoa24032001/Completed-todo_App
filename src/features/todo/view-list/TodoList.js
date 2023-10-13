import React, { useMemo, useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { Container, Stack, } from "@mui/material";
import { Loading } from "../../../components/loadingPage";
import { Pagination } from "../../../components/pagination";
import useToggle from "../../../hooks/useToggle";
import { getColor } from "../../../services/todo/color-service";
import DeleteTodoDialog from "../dialogs/DeleteTodoDialog";
import EditTodoDialog from "../dialogs/EditTodoDialog";
import { useSelector, useDispatch } from 'react-redux'
import { selectFilterColor, selectFilterSortBy, selectFilterStatus, selectTodosIds, selectTodosLastPage, selectTodosLoading } from "../../../app/redux/todos/todoSelect";
import { fetchTodos } from "../../../app/redux/todos/todoThunk";

import { useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "../../../app/redux/api/apiSlice";



// function TodoList({ isLoading, isAdding, fetchTodos, lastPage, filterColor, filterStatus, filterSortBy, todosIds }) {
function TodoList({ isAdding }) {

  const todosIds2 = useSelector((state) => selectTodosIds(state));
  const isLoading2 = useSelector((state) => selectTodosLoading(state));
  const lastPage2 = useSelector((state) => selectTodosLastPage(state));
  const filterStatus = useSelector((state) => selectFilterStatus(state));
  const filterColor = useSelector((state) => selectFilterColor(state));
  const filterSortBy = useSelector((state) => selectFilterSortBy(state));
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);



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


  const [currentPage, setCurrentPage] = useState(1);

  const { toggle: openDeleteDial, handleOpen: handleOpenDelete, handleClose: handleCloseDeleteDial } = useToggle()
  const { toggle: openEditDial, handleOpen: handleOpenEdit, handleClose: handleCloseEditDial } = useToggle()

  // TEST RTK QUERY
  const params = useMemo(() => {
    return { page: currentPage, sortBy: filterSortBy, status: filterStatus, colors: filterColor }
    // Ham nay se tinh toan lai khi ma dependency array changed
  }, [currentPage, filterColor, filterStatus, filterSortBy]);
  const { data, isFetching } = useGetTodosQuery(params);
  const todos = data?.listTodos
  const lastPage = data?.todoListLastPage;


  // TEST REDUX
  // useEffect(() => {
  //   const params = { page: currentPage, sortBy: "", status: "all" }
  //   if (filterColor) params.colors = filterColor
  //   if (filterStatus) params.status = filterStatus
  //   if (filterSortBy) params.sortBy = filterSortBy

  //   dispatch(fetchTodos(params))

  // }, [currentPage, filterColor, filterStatus, filterSortBy])


  function handleDeleteTodo(todo) {
    setCurrentTodo(todo)
    handleOpenDelete()
  }


  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  function handleUpdateTodo(todo) {
    setCurrentTodo(todo)
    handleOpenEdit()
  }

  const listTodo = useMemo(() => {
    return todos?.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={handleDeleteTodo}
        onUpdate={handleUpdateTodo}
      />
    ))
  }, [todos]);

  // const listTodo = useMemo(() => {
  //   if (!todosIds) return (<>{error}</>)
  //   return (
  //     <>
  //       {todosIds.map((id) => {
  //         return (
  //           <TodoItem
  //             key={id}
  //             todoId={id}
  //             onDelete={handleDeleteTodo}
  //             onUpdate={handleUpdateTodo}
  //           />
  //         )
  //       })}
  //     </>
  //   );
  // }, [todosIds]);




  const showLoading = isFetching || isDeleting || isEditing || isAdding

  const [deleteRTKTodo] = useDeleteTodoMutation();
  function onClickDelete(id) {
    setIsDeleting(true)
    deleteRTKTodo(id)
      .finally(() => {
        setIsDeleting(false);
      });
  }

  const [updateRTKTodo] = useUpdateTodoMutation();
  function onClickUpdate({ id, params }) {
    setIsEditing(true)
    updateRTKTodo({ id: id, params: params })
      .finally(() => {
        setIsEditing(false);
      });
  }


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
        onClickDelete={onClickDelete}
      />}

      {openEditDial && <EditTodoDialog
        open={openEditDial}
        todo={currentTodo}
        colors={colors}
        handleClose={handleCloseEditDial}
        onClickUpdate={onClickUpdate}
      />}
    </>

  );
};

export default TodoList



