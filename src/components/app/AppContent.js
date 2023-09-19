import React from "react";
import Stack from "@mui/material/Stack";


export const AppContent = ({ contentRender = () => <></> }) => {
  return (
    <Stack direction={"column"} maxWidth="md" margin="0 auto" >
      {contentRender()}
    </Stack>
  );
};

AppContent.propTypes = {};
