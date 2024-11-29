import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomAlert({ type, text, show, onClose }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        width: "fit-content",
        zIndex: 999,
      }}>
      <Collapse in={show}>
        <Alert
          severity={type}
          variant='filled'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={onClose}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}>
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
}
