import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  containerSpaceAround: {
    display: "flex",
    margin: "10px 0 !important",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  posterContainer: {
    display: "flex",
    justifyContent: "flex-start",
    height: "100%",
  },
  poster: {
    borderRadius: "20px",
    boxShadow: "0.5em 1em 1em rgb(64, 64, 70)",
    width: "80%",
    marginBottom: "20px",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "auto",
      height: "350px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "auto",
      height: "350px",
      marginBottom: "30px",
      justifyContent: "center",
    },
  },
}));

export default useStyles;
