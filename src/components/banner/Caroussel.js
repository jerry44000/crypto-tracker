import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { TrendingCoins } from "../../config/api.js";
import { CryptoState } from "../../context/CryptoContext.js";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  caroussel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const Caroussel = () => {
  const classes = useStyles();
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {
      let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carousselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
            {coin?.symbol}
            &nbsp;
            <span>
{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
        </span>
      </Link>
    );
  });

  return (
    <div className={classes.caroussel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Caroussel;
