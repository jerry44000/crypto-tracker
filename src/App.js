import "./App.css";
import { Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header.js";
import HomePage from "./pages/HomePage.js";
import CoinPage from "./pages/CoinPage.js";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#0a0326",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
