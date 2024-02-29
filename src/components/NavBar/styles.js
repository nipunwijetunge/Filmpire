import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((_theme) => ({
  toolbar: {
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "240px",
    [_theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      flexWrap: "wrap",
    },
  },
  menuButton: {
    marginRight: _theme.spacing(2),
    [_theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default useStyles;
