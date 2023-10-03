import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CheckBox } from "../../../components/checkbox";
import { ListTodoButton } from "../../../components/buttons";
import { ColorTag } from "../../../components/colorTag";
import { Stack } from "@mui/material";
import useToggle from "../../../hooks/useToggle";
import { ViewDetailDialog } from "../dialogs/ViewDetailDialog";
import { selectTodoById } from "../../../app/redux/todos/todoSelect";
import { useSelector } from "react-redux";



const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  // alignItems: 'stretch',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));



export const TodoItem = ({ onDelete, onUpdate, todoId }) => {
  const { toggle: isOpenViewDial, handleOpen, handleClose } = useToggle()

  const todo = useSelector((state) => selectTodoById(state, todoId))


  function handleAction(action) {
    if (action === "delete") onDelete?.(todo);
    else onUpdate?.(todo);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: "15px", border: "1px solid #ddd" }} onDoubleClick={handleOpen}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#ffffff",
            boxShadow: "none",
            color: (theme) => theme.palette.common.black,
          }}
        >
          <StyledToolbar>
            <IconButton
              size="large"
              edge="start"
              color="black"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <CheckBox state={todo?.completed} />
            </IconButton>
            <Stack flex={1} >
              <Typography
                variant="h5"
                noWrap
                component="div"
                fontWeight="bold"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                maxWidth={"300px"}
                sx={{ rowGap: "50px", color: "black" }}
              >
                {todo?.text}
              </Typography>
              {todo?.color?.name ? <ColorTag color={todo?.color?.name} /> : <ColorTag color={"None"} />}
            </Stack>
            <ListTodoButton onAction={handleAction} />
          </StyledToolbar>
        </AppBar>
      </Box>

      {isOpenViewDial && <ViewDetailDialog open={isOpenViewDial} onClose={handleClose} todo={todo} />}
    </>
  );
};


