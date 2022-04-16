import React, { useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/api.js";
import { CryptoState } from "../context/CryptoContext.js";
import Pagination from "@material-ui/lab/Pagination";
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
  TableContainer,
  TableCell,
  TableHead,
  Table,
  TableBody,
  TableRow,
  LinearProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {
  let navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();

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

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });
  const classes = useStyles();
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
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "green" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "green" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Oswald",
                      }}
                      key={head}
                        align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                      className={classes.row}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ display: "flex", gap: 15 }}
                      ></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
