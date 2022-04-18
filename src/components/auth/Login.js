import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { CryptoState } from "../../context/CryptoContext.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setAlert({
          open: true,
          message: "Wrong password, try again",
          type: "error",
        });
      }
      if (error.code === "auth/email-already-exists") {
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "green" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
