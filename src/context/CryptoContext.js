import React, { useState, useEffect, createContext, useContext } from "react";
import { CoinList } from "../config/api.js";
import axios from "axios";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("EUR");
  const [symbol, setSymbol] = useState("€");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
    // console.log(data);
  };

  useEffect(() => {
    if (currency === "EUR") setSymbol("€");
    if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
