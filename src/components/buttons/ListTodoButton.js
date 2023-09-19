import React from 'react';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';


export const ListTodoButton = ({ onAction }) => {
    function handleUpdate() {
        onAction?.("update");
    }
    function handleDelete() {
        onAction?.("delete");
    }
    return (
        <Stack spacing={2} direction="row">
            <Button onClick={handleUpdate}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
        </Stack>
    );
}