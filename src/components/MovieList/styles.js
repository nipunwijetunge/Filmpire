import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "auto",
    [theme.breakpoints.down("lg")]: {
      justifyContent: "center",
    },
  },
}));

export default useStyles;
