import React, { useMemo, useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { Container, Stack, } from "@mui/material";
import { Loading } from "../../../components/loadingPage";
import { Pagination } from "../../../components/pagination";
import useToggle from "../../../hooks/useToggle";
import { getColor } from "../../../services/todo/color-service";
import DeleteTodoDialog from "../dialogs/DeleteTodoDialog";
import EditTodoDialog from "../dialogs/EditTodoDialog";
import { connect, useSelector, useDispatch } from 'react-redux'
// import { fetchTodos } from "../../../app/redux/todos/todoActions";
import { selectFilterColor, selectFilterSortBy, selectFilterStatus, selectTodosIds, selectTodosLastPage, selectTodosLoading } from "../../../app/redux/todos/todoSelect";
import { fetchTodos } from "../../../app/redux/todos/todoThunk";



// function TodoList({ isLoading, isAdding, fetchTodos, lastPage, filterColor, filterStatus, filterSortBy, todosIds }) {
function TodoList({ isAdding }) {

  const todosIds = useSelector((state) => selectTodosIds(state));
  // console.log(todosIds2)
  const isLoading = useSelector((state) => selectTodosLoading(state));
  const lastPage = useSelector((state) => selectTodosLastPage(state));
  const filterStatus = useSelector((state) => selectFilterStatus(state));
  const filterColor = useSelector((state) => selectFilterColor(state));
  const filterSortBy = useSelector((state) => selectFilterSortBy(state));
  const dispatch = useDispatch();



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



  // TEST REDUX
  useEffect(() => {
    const params = { page: currentPage, sortBy: "", status: "all" }
    if (filterColor) params.colors = filterColor
    if (filterStatus) params.status = filterStatus
    if (filterSortBy) params.sortBy = filterSortBy

    dispatch(fetchTodos(params))

  }, [currentPage, filterColor, filterStatus, filterSortBy])


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
    if (!todosIds) return
    return (
      <>
        {todosIds.map((id) => {
          return (
            <TodoItem
              key={id}
              todoId={id}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          )
        })}
      </>
    );
  }, [todosIds]);


  const showLoading = isLoading || isAdding

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
      />}

      {openEditDial && <EditTodoDialog
        open={openEditDial}
        todo={currentTodo}
        colors={colors}
        handleClose={handleCloseEditDial}
      />}
    </>

  );
};


// const mapStateToProps = state => {
//   return {
//     todosIds: selectTodosIds(state),
//     isLoading: selectTodosLoading(state),
//     lastPage: selectTodosLastPage(state),
//     filterStatus: selectFilterStatus(state),
//     filterColor: selectFilterColor(state),
//     filterSortBy: selectFilterSortBy(state)
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchTodos: (params) => dispatch(fetchTodos(params)),
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps)(TodoList)

export default TodoList



