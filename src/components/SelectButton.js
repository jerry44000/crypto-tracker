import { makeStyles } from "@material-ui/core/styles";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Oswald",
      cursor: "pointer",
      backgroundColor: selected ? "green" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "green",
        color: "black",
      },
      
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
