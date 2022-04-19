import React, { useState, useEffect, createContext, useContext } from "react";
import { CoinList } from "../config/api.js";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("EUR");
  const [symbol, setSymbol] = useState("€");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscrib = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("no items in wl");
        }
      });
      return () => {
        unsubscrib();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log(user);
    });
  }, []);

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
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        user,
        alert,
        setAlert,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
