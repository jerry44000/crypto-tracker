import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Caroussel from "./Caroussel.js";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./bannerTech.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center"
  }
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Oswald",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Oswald",
            }}
          >
            Info about your currency
          </Typography>
        </div>
        <Caroussel />
      </Container>
    </div>
  );
};

export default Banner;
