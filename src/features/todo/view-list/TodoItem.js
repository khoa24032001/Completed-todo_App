import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CheckBox } from "../../../components/checkbox";
import { ListTodoButton } from "../../../components/buttons";
import { ColorTag } from "../../../components/color_Tag";


import { Stack } from "@mui/material";

import useToggle from "../../../hooks/useToggle";
import { ViewDetailDialog } from "../dialogs/ViewDetailDialog";

import { useSelector } from 'react-redux'


// const ACTION_TYPE = {
//   yes: 'yes',
//   no: 'no'
// }

// const actions = [
//   { title: 'Yes', action: ACTION_TYPE.yes },
//   { title: 'No', action: ACTION_TYPE.no }
// ]

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  // alignItems: 'stretch',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));



export const TodoItem = ({ todo, onDelete, onUpdate, todoId }) => {
  const { toggle: isOpenViewDial, handleOpen, handleClose } = useToggle()

  // const { text: content, color, completed: status } = todo
  // const { name: colorName } = color ?? {}

  const todoA = useSelector((state) => state.todo?.todos?.normalizedTodos[todoId])
  // console.log(todoA)

  // function handleAction(action) {
  //   if (action === "delete") onDelete?.(todo);
  //   else onUpdate?.(todo);
  // }

  function handleAction(action) {
    if (action === "delete") onDelete?.(todoA);
    else onUpdate?.(todoA);
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
              {/* <CheckBox state={status} /> */}
              <CheckBox state={todoA?.completed} />
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
                {/* {content} */}
                {todoA?.text}
              </Typography>
              {/* {colorName ? <ColorTag color={colorName} /> : <ColorTag color={"None"} />} */}
              {todoA?.color?.name ? <ColorTag color={todoA?.color?.name} /> : <ColorTag color={"None"} />}
            </Stack>
            {/* suy nghi cach giai quyet dialog button */}
            <ListTodoButton onAction={handleAction} />
          </StyledToolbar>
        </AppBar>
      </Box>
      {/* <ConfirmDialog open={isOpenViewDial} actions={actions} onConfirm={(action) => {
        switch (action) {
          case ACTION_TYPE.yes:
            
            break;
          case ACTION_TYPE.no: 

            break;
          default:
            break;
        }
      }} /> */}

      {/* <ConfirmDialog open={isOpenViewDial} actions={actions} onConfirm={handleClose} /> */}
      {/* {isOpenViewDial && <ViewDetailDialog open={isOpenViewDial} onClose={handleClose} todo={todo} />} */}
      {isOpenViewDial && <ViewDetailDialog open={isOpenViewDial} onClose={handleClose} todo={todoA} />}
    </>
  );
};

// TodoItem.propTypes = {
//   content: PropTypes.string.isRequired,
//   color: PropTypes.string.isRequired,
//   status: PropTypes.bool.isRequired,
// };
