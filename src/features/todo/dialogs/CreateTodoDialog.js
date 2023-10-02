import React, { useState } from "react";
import { ExDialog } from "../../../components/dialog";
import { Button, Stack, TextField, Typography } from "@mui/material";
// import { COLORS, STATUS_OPTIONS } from "../../../utils/constants";
// import { Dropdown } from "../../../components/dropdown";
// import { getColor } from "../../../services/todo/color-service";
import { addTodo, addTodoAsync, updateTodoAsync } from "../../../services/todo/todo-service";
import { addNewTodo } from "../../../app/redux/todos/todoActions";
import { connect } from "react-redux";


// De lam gi ????
//  -- De them/tao todo
// Input: - list of colors (props)
// Output: - a new todo/ created sussess
//


const CreateTodoDialog = ({ open, onClose, todos, onChangeTodos, onChangeAdding, addNewTodo }) => {


    const [todo, setTodo] = useState({
        text: " ",
        color: { id: '', name: '' },
        completed: false
    });

    const handleAddChange = (e, field) => {
        setTodo(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    };


    // Cach 1
    const handleAddSuccess = (data) => {
        const newTodo = [data, ...todos]
        onChangeTodos(newTodo)
        onChangeAdding(false)
    }

    const handleAddError = (error) => {
        console.error('Lỗi khi gọi API add todo:', error);
        onChangeAdding(false)
    }


    // Cach 2
    function onClickAdding(params) {
        onChangeAdding(true)
        addTodoAsync(params)
            .then(data => {
                if (data instanceof Error) {
                    // Xử lý lỗi nếu có
                    console.error('Lỗi khi gọi update todo API :', data);
                } else {
                    // Xóa dữ liệu todo thành công
                    const newTodo = [data, ...todos]
                    onChangeTodos(newTodo);
                }
            })
            .finally(() => {
                // Dừng hiển thị loading sau khi xử lý xong (thành công hoặc thất bại)
                onChangeAdding(false);
            });
    }


    function handleSubmit() {
        const { text, color, completed } = todo ?? {}
        const params = {
            text,
            color: color?.name,
            completed
        }
        //Cach 1
        // addTodo(params, handleAddSuccess, handleAddError, () => onChangeAdding(true))
        // Cach 2
        // onClickAdding(params)

        //REDUX
        addNewTodo(params)

        onClose()
    }


    return (
        <ExDialog open={open} onClose={onClose}>
            <ExDialog.Header title="Create Todo" onClose={onClose} />
            <ExDialog.Body>
                {/* Form to create a todo */}
                <form>
                    <Typography display='flex' mb={'10px'} component='div'>
                        <Typography alignSelf={'center'} width={'120px'} component='div'>
                            Content:
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label="Enter your todo"
                            variant="outlined"
                            fullWidth
                            value={todo?.text}
                            onChange={e => handleAddChange(e, 'text')}
                        />
                    </Typography>
                </form>
            </ExDialog.Body>
            <ExDialog.Footer>
                <Stack spacing={2} direction="row">
                    <Button autoFocus sx={{ color: "blue" }} onClick={onClose}>
                        Return
                    </Button>
                    <Button autoFocus sx={{ color: "green" }} onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Stack>
            </ExDialog.Footer>
        </ExDialog>
    );
};

const mapStateToProps = state => {
    // console.log(state)
    return {
        // todos: state.todo?.todos?.data,
        todos: state.todo?.todos?.normalizedTodos,
        isLoading: state.todo?.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewTodo: (params) => dispatch(addNewTodo(params))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(CreateTodoDialog)
