import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext.js";
import AuthModal from "./auth/AuthModal.js";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    fontFamily: "Oswald",
    fontWeight: "bold",
    cursor: "pointer",
    color: "green",
  },
}));

const Header = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              Crypto Tracker
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
            <AuthModal />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
