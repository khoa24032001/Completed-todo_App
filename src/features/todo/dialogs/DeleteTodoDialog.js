import { Button, Typography } from "@mui/material"
import { ExDialog } from "../../../components/dialog"
import { deleteTodo } from "../../../services/todo/todo-service"
import { removeTodo } from "../../../app/redux/todos/todoActions"
import { connect } from "react-redux"

const actions = [
    {
        id: 1,
        title: "Cancel",
        action: "cancel",
        style: { variant: 'text', color: 'inherit', sx: {} }
    },
    {
        id: 2,
        title: "Delete",
        action: "confirm",
        style: { variant: 'contained', color: 'error' }
    },
]

const DeleteTodoDialog = ({ open, todo, setIsDeleting, handleClose, handleDeleteError, handleDeleteSuccess, onClickDelete, removeTodo }) => {

    function handleDelete(id) {
        // onClickDelete(id)
        handleClose()
    }
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
                    actions.map((action) => {
                        return (
                            <>
                                {action.action === 'confirm' ?
                                    (<Button key={action.id}
                                        //REDUX
                                        onClick={() => {
                                            removeTodo(todo.id)
                                            handleClose()
                                        }}
                                        // Cach 1
                                        // onClick={() => {
                                        //     deleteTodo(todo.id, handleDeleteSuccess, handleDeleteError, setIsDeleting)
                                        //     handleClose()
                                        // }}
                                        // Cach 2
                                        // onClick={handleDelete(todo.id)}
                                        {...action.style}>
                                        {action.title}
                                    </Button>) : (
                                        <Button key={action.id} onClick={handleClose} {...action.style}>
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

const mapStateToProps = state => {
    // console.log(state)
    return {
        todos: state.todo?.todos?.data,
        isLoading: state.todo?.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeTodo: (params) => dispatch(removeTodo(params))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps)(DeleteTodoDialog)