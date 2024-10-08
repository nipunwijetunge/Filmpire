import { makeStyles } from "tss-react/mui";

// export default makeStyles(() => ({
//   root: {
//     display: "flex",
//     height: "100%",
//   },
//   toolbar: {
//     height: "70px",
//   },
//   content: {
//     flexGrow: "1",
//     padding: "2em",
//   },
// }));

const useStyles = makeStyles()({
  root: {
    display: "flex",
    height: "100%",
  },
  toolbar: {
    height: "70px",
  },
  content: {
    flexGrow: "1",
    padding: "2em",
  },
});

export default useStyles;
