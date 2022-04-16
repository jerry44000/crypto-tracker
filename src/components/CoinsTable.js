import React, { useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/api.js";
import { CryptoState } from "../context/CryptoContext.js";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Typography,
  Container,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

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
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: "Oswald" }}>
          Prices
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          style={{ marginBottom: 20, width: "50%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
