import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));

export default useStyles;
