import { Snackbar } from "@material-ui/core";
import React, { useState } from "react";
import { CryptoState } from "../context/CryptoContext.js";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };
  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          elevation={10}
          variant="filled"
          severity={alert.type}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Alert;
