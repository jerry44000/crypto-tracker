import React, { useState, useEffect } from "react";
import { HistoricalChart } from "../config/api.js";
import { CryptoState } from "../context/CryptoContext.js";
import { chartDays } from "../config/data";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import SelectButton from "./SelectButton.js";
import { Line } from "react-chartjs-2";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);

  const { currency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "25",
      padding: 40,
    },
  }));
  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };
  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
       
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
