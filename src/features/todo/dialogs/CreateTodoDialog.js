import React, { useState } from "react";
import { ExDialog } from "../../../components/dialog";
import { Button, Stack, TextField, Typography } from "@mui/material";
// import { addNewTodo } from "../../../app/redux/todos/todoActions";
import { connect, useDispatch } from "react-redux";
import { addNewTodo } from "../../../app/redux/todos/todoThunk";


// const CreateTodoDialog = ({ open, onClose, addNewTodo }) => {
const CreateTodoDialog = ({ open, onClose }) => {
    const dispatch = useDispatch();

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

    function handleSubmit() {
        const { text, color, completed } = todo ?? {}
        const params = {
            text,
            color: color?.name,
            completed
        }
        dispatch(addNewTodo(params))

        onClose()
    }


    return (
        <ExDialog open={open} onClose={onClose}>
            <ExDialog.Header title="Create Todo" onClose={onClose} />
            <ExDialog.Body>
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

// const mapStateToProps = state => {
//     return {
//         todos: state.todo?.todos?.normalizedTodos,
//         isLoading: state.todo?.loading,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         addNewTodo: (params) => dispatch(addNewTodo(params))
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps)(CreateTodoDialog)

export default CreateTodoDialog
