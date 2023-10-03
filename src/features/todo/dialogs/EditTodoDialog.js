import { useState } from "react";
import { ExDialog } from "../../../components/dialog";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Dropdown } from "../../../components/dropdown";
import { STATUS_OPTIONS } from "../../../utils/constants";
import { connect } from "react-redux";
import { changeTodo } from "../../../app/redux/todos/todoActions";

const EditTodoDialog = ({ open, handleClose, colors, todo, changeTodo }) => {
    const [editedTodo, setEditedTodo] = useState(todo);

    function handleEditChange(e, field) {
        setEditedTodo(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    }


    function convertToOptions(datas) {
        return datas.map((data) => {
            return { value: data.id, title: data.name };
        });
    }

    function handleEditColorChange(e) {
        const newName = e.target.value;
        setEditedTodo(prevState => ({
            ...prevState,
            color: { ...prevState.color, name: newName }
        }));
    }


    function handleSubmit() {
        const { id, text, color, completed } = editedTodo ?? {}
        const params = {
            text,
            color: color?.name,
            completed
        }
        changeTodo(id, params)
        handleClose()
    }

    return (
        <ExDialog open={open} onClose={handleClose}>
            <ExDialog.Header title="Edit your todo" onClose={handleClose} />
            <ExDialog.Body>
                {/* Form to create a todo */}
                <Typography display='flex' mb={'10px'} component='div'>
                    <Typography alignSelf={'center'} width={'120px'} component='div'>
                        Content:
                    </Typography>
                    <TextField id="outlined-basic" label="Enter your todo" variant="outlined" value={editedTodo.text ?? null}
                        // defaultValue={content} 
                        onChange={e => handleEditChange(e, 'text')} fullWidth />
                </Typography>
                <Typography display='flex' mb={'10px'} component='div'>
                    <Typography alignSelf={'center'} width={'100px'} component='div'>
                        Select color:
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        spacing={{ xs: 1, md: 2 }}
                        flexGrow={1}
                    >
                        <Dropdown options={convertToOptions(colors)}
                            // value={name}
                            value={editedTodo.color?.name ?? null}
                            name="Color" onChange={e => handleEditColorChange(e)} />

                    </Stack>
                </Typography>
                <Typography display='flex' mb={'10px'} component='div'>
                    <Typography alignSelf={'center'} width={'100px'} component='div'>
                        Select status:
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        spacing={{ xs: 1, md: 2 }}
                        flexGrow={1}
                    >
                        <Box sx={{ maxWidth: '200px', flex: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{"Status"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={"Status"}
                                    value={editedTodo?.completed ?? null}
                                    onChange={e => handleEditChange(e, 'completed')}
                                >
                                    {STATUS_OPTIONS.map((item) => {
                                        return (<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>
                </Typography>

            </ExDialog.Body>
            <ExDialog.Footer>
                <Stack spacing={2} direction="row">
                    <Button autoFocus sx={{ color: "blue" }} onClick={handleClose}>
                        Return
                    </Button>
                    <Button autoFocus sx={{ color: "green" }}
                        onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Stack>
            </ExDialog.Footer>
        </ExDialog>
    )
}

const mapStateToProps = state => {
    // console.log(state)
    return {
        todos: state.todo?.todos?.data,
        isLoading: state.todo?.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeTodo: (id, params) => dispatch(changeTodo(id, params))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(EditTodoDialog)





