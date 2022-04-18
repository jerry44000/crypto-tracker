import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { CryptoState } from "../../context/CryptoContext.js";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";

const SignUp = ({ handleClose }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { alert, setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== repeatPassword) {
      setAlert({
        open: true,
        message: "Password doesn't match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Successfully register. Welcome ${result.user.email}`,
        type: "success"
      });
      handleClose();
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setAlert({
          open: true,
          message: "Email format invalid",
          type: "error",
        });
      }
      if (error.code === "auth/email-already-in-use") {
        setAlert({
          open: true,
          message: "Email already used",
          type: "error",
        });
      }
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >

      <TextField
        variant="outlined"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type={showPassword ? "text" : "password"}
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        type={showPassword ? "text" : "password"}
        label="Repeat Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "green" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
