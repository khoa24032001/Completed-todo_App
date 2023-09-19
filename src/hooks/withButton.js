import React from "react";
import { Button } from "@mui/material";
import useToggle from "./useToggle";


export default function withButton(DialogComponent) {
    return ({ labelBtn, content, styleBtn, onConfirm, actions, confirmTitle, todoList, todoKey, onUpdate, todos, onChangeTodos, onChangeAdding }) => {
        const { toggle: open, handleOpen, handleClose } = useToggle()

        return <>
            <Button {...styleBtn} onClick={handleOpen}>
                {labelBtn}
            </Button>
            <DialogComponent
                open={open}
                onClose={handleClose}
                content={content}
                onConfirm={onConfirm}
                actions={actions}
                confirmTitle={confirmTitle}
                todoList={todoList}
                todoKey={todoKey}
                onUpdate={onUpdate}
                todos={todos}
                onChangeTodos={onChangeTodos}
                onChangeAdding={onChangeAdding}
            />
        </>
    }

}