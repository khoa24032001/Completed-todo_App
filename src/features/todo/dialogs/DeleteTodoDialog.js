import { Button, Typography } from "@mui/material"
import { ExDialog } from "../../../components/dialog"
import { deleteTodo } from "../../../services/todo/todo-service"

const actions = [
    {
        title: "Cancel",
        action: "cancel",
        style: { variant: 'text', color: 'inherit', sx: {} }
    },
    {
        title: "Delete",
        action: "confirm",
        style: { variant: 'contained', color: 'error' }
    },
]

const DeleteTodoDialog = ({ open, todo, setIsDeleting, handleClose, handleDeleteError, handleDeleteSuccess }) => {
    return (
        <ExDialog
            open={open}
            onClose={handleClose}>
            <ExDialog.Header
                title={"Do you want to delete this todo?"}
                onClose={handleClose}
            />
            <ExDialog.Body>
                <Typography sx={{ fontWeight: "bold" }} >{todo.text}</Typography>
            </ExDialog.Body>
            <ExDialog.Footer>
                {
                    actions.map((action, idx, idx2) => {
                        return (
                            <>
                                {action.action === 'confirm' ?
                                    (<Button key={idx}
                                        onClick={() => {
                                            deleteTodo(todo.id, handleDeleteSuccess, handleDeleteError, setIsDeleting)
                                            handleClose()
                                        }}
                                        {...action.style}>
                                        {action.title}
                                    </Button>) : (
                                        <Button key={idx2} onClick={handleClose} {...action.style}>
                                            {action.title}
                                        </Button>
                                    )
                                }
                            </>
                        )
                    })
                }
            </ExDialog.Footer>
        </ExDialog>
    )
}

export default DeleteTodoDialog