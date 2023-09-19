import React, { useState } from "react";
import { ExDialog } from "../../../components/dialog";
import { Button, Stack, TextField, Typography } from "@mui/material";
// import { COLORS, STATUS_OPTIONS } from "../../../utils/constants";
// import { Dropdown } from "../../../components/dropdown";
// import { getColor } from "../../../services/todo/color-service";
import { addTodo } from "../../../services/todo/todo-service";


// De lam gi ????
//  -- De them/tao todo
// Input: - list of colors (props)
// Output: - a new todo/ created sussess
//


export const CreateTodoDialog = ({ open, onClose, todos, onChangeTodos, onChangeAdding }) => {


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



    const handleAddSuccess = (data) => {
        const newTodo = [data, ...todos]
        console.log(newTodo)
        onChangeTodos(newTodo)
        onChangeAdding(false)
    }

    const handleAddError = (error) => {
        console.error('Lỗi khi gọi API add todo:', error);
        onChangeAdding(false)
    }


    function handleSubmit() {
        const { text, color, completed } = todo ?? {}
        const params = {
            text,
            color: color?.name,
            completed
        }
        addTodo(params, handleAddSuccess, handleAddError, onChangeAdding)
        onClose()
    }


    return (
        <ExDialog open={open} onClose={onClose}>
            <ExDialog.Header title="Create Todo" onClose={onClose} />
            <ExDialog.Body>
                {/* Form to create a todo */}
                <form>
                    <Typography display='flex' mb={'10px'}>
                        <Typography alignSelf={'center'} width={'120px'}>
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
