import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api.js";
import { CryptoState } from "../context/CryptoContext.js";
import CoinInfo from "../components/CoinInfo.js";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { numberWithCommas } from "../components/banner/Caroussel.js";
import DOMPurify from "dompurify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sideBar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid green",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Oswald",
    },
    description: {
      width: "100%",
      fontFamily: "Oswald",
      padding: 20,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
    },
  }));

  const classes = useStyles();

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to your Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((watch) => watch !==coin?.id)},
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Remove from your Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "green" }} />;
  }
  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          type={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography className={classes.description}>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(coin?.description.en.split(". ")[0]),
            }}
          ></p>
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography className={classes.heading}>Rank: </Typography>
            &nbsp; &nbsp;
            <Typography style={{ fontFamily: "Oswald" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography className={classes.heading}>Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{ width: "100%", height: 40, backgroundColor: "green" }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist
                ? "Remove from your watchlist"
                : "Add to your Watchlist"}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
