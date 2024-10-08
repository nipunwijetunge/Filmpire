import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  containerSpaceAround: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "10px 0 !important",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  posterContainer: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  poster: {
    borderRadius: "20px",
    boxShadow: "0.5em 1em 1em rgb(64, 64, 70)",
    width: "auto",
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
    },
  },
  genresContainer: {
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  genreImage: {
    filter: theme.palette.mode === "dark" && "invert(1)",
    marginRight: "10px",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
    },
  },
  castImage: {
    width: "100%",
    maxWidth: "7em",
    height: "8em",
    objectFit: "cover",
    borderRadius: "10px",
  },
  buttonsContainer: {
    border: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "50%",
    height: "50%",
    margin: "10% 0 0 25%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "90%",
    },
  },
}));

export default useStyles;
