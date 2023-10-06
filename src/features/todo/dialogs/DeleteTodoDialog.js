import { Button, Typography } from "@mui/material"
import { ExDialog } from "../../../components/dialog"
// import { removeTodo } from "../../../app/redux/todos/todoActions"
import { connect, useDispatch } from "react-redux"
import { removeTodo } from "../../../app/redux/todos/todoThunk"

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

// const DeleteTodoDialog = ({ open, todo, handleClose, removeTodo }) => {
const DeleteTodoDialog = ({ open, todo, handleClose }) => {
    const dispatch = useDispatch()


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
                                        // onClick={() => {
                                        //     removeTodo(todo.id)
                                        //     handleClose()
                                        // }}
                                        //REDUX TOOLKIT
                                        onClick={() => {
                                            dispatch(removeTodo(todo.id))
                                            handleClose()
                                        }}
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

// const mapStateToProps = state => {
//     return {
//         todos: state.todo?.todos?.data,
//         isLoading: state.todo?.loading,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         removeTodo: (params) => dispatch(removeTodo(params))
//     }
// }


// export default connect(
//     mapStateToProps,
//     mapDispatchToProps)(DeleteTodoDialog)

export default DeleteTodoDialog