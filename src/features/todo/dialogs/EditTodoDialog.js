import { useState } from "react";
import { updateTodo } from "../../../services/todo/todo-service";
import { ExDialog } from "../../../components/dialog";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Dropdown } from "../../../components/dropdown";
import { STATUS_OPTIONS } from "../../../utils/constants";

const EditTodoDialog = ({ open, handleClose, colors, todo, setIsEditing, handleUpdateError, handleUpdateSuccess, onClickUpdate }) => {
    const [editedTodo, setEditedTodo] = useState(todo);
    // console.log(editedTodo.color.name)

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
        // Cach 1
        // updateTodo(id, params, handleUpdateSuccess, handleUpdateError, setIsEditing)

        // Cach 2
        onClickUpdate(id, params)
        handleClose()
    }

    return (
        <ExDialog open={open} onClose={handleClose}>
            <ExDialog.Header title="Edit your todo" onClose={handleClose} />
            <ExDialog.Body>
                {/* Form to create a todo */}
                <Typography display='flex' mb={'10px'}>
                    <Typography alignSelf={'center'} width={'120px'}>
                        Content:
                    </Typography>
                    <TextField id="outlined-basic" label="Enter your todo" variant="outlined" value={editedTodo.text ?? null}
                        // defaultValue={content} 
                        onChange={e => handleEditChange(e, 'text')} fullWidth />
                </Typography>
                <Typography display='flex' mb={'10px'}>
                    <Typography alignSelf={'center'} width={'100px'}>
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
                <Typography display='flex' mb={'10px'}>
                    <Typography alignSelf={'center'} width={'100px'}>
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


export default EditTodoDialog

// import React, { useEffect, useState } from "react";
// import { ExDialog } from "../../../components/dialog";
// import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
// import { Dropdown } from "../../../components/dropdown";
// import { getColor } from "../../../services/todo/color-service";
// // HOC
// const STATUS = [{
//     id: 1,
//     name: "Completed",
//     value: true
// },
// {
//     id: 2,
//     name: "Incomplete",
//     value: false
// }]

// export const EditTodoDialog = ({ open, onClose, todo, onUpdate }) => {
//     const [colors, setColors] = useState([]);

//     const [editedTodo, setEditedTodo] = useState(todo ?? null);

//     useEffect(() => {
//         getColor(handleLoadColorSuccess, handleLoadColorError)
//     }, []);

//     const handleLoadColorSuccess = (data) => {
//         setColors(data);
//     }
//     const handleLoadColorError = (error) => {
//         console.error('Lỗi khi gọi color API:', error);
//     }

//     const handleEditChange = (e, field) => {
//         setEditedTodo(prevState => ({
//             ...prevState,
//             [field]: e.target.value
//         }));
//     };

//     const handleUpdate = () => {
//         onUpdate?.(editedTodo);
//     }
//     return (
//         <ExDialog open={open} onClose={onClose}>
//             <ExDialog.Header title="Edit your todo" onClose={onClose} />
//             <ExDialog.Body>
//                 {/* Form to create a todo */}
//                 <Typography display='flex' mb={'10px'}>
//                     <Typography alignSelf={'center'} width={'120px'}>
//                         Content:
//                     </Typography>
//                     <TextField id="outlined-basic" label="Enter your todo" variant="outlined" value={editedTodo.text}
//                         // defaultValue={content}
//                         onChange={e => handleEditChange(e, 'text')} fullWidth />
//                 </Typography>
//                 {/* <Typography display='flex' mb={'10px'}>
//                     <Typography alignSelf={'center'} width={'100px'}>
//                         Select color:
//                     </Typography>
//                     <Stack
//                         direction="row"
//                         alignItems="center"
//                         justifyContent="flex-start"
//                         spacing={{ xs: 1, md: 2 }}
//                         flexGrow={1}
//                     >
//                         <Dropdown options={colors}
//                             value={editedTodo.color}
//                             name="Color" onChange={e => handleEditChange(e, 'color')} />
//                     </Stack>
//                 </Typography> */}
//                 <Typography display='flex' mb={'10px'}>
//                     <Typography alignSelf={'center'} width={'100px'}>
//                         Select status:
//                     </Typography>
//                     <Stack
//                         direction="row"
//                         alignItems="center"
//                         justifyContent="flex-start"
//                         spacing={{ xs: 1, md: 2 }}
//                         flexGrow={1}
//                     >
//                         <Box sx={{ maxWidth: '200px', flex: 1 }}>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">{"Status"}</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     label={"Status"}
//                                     value={editedTodo.completed}
//                                     onChange={e => handleEditChange(e, 'completed')}
//                                 >
//                                     {STATUS.map((item) => {
//                                         return (<MenuItem key={item.id} value={item.value}>{item.name}</MenuItem>)
//                                     })}
//                                 </Select>
//                             </FormControl>
//                         </Box>
//                     </Stack>
//                 </Typography>

//             </ExDialog.Body>
//             <ExDialog.Footer>
//                 <Stack spacing={2} direction="row">
//                     <Button autoFocus sx={{ color: "blue" }} onClick={onClose}>
//                         Return
//                     </Button>
//                     <Button autoFocus sx={{ color: "green" }}
//                         onClick={() => handleUpdate()}>
//                         Confirm
//                     </Button>
//                 </Stack>
//             </ExDialog.Footer>
//         </ExDialog>
//     );
// };
