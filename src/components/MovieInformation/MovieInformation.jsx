import React from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useStyles from "./styles";
import { useGetMovieQuery } from "../../services/TMDB";

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { classes } = useStyles();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong!</Link>
      </Box>
    );
  }

  return (
    <Grid container={classes.containerSpaceAround}>
      <Grid>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={data?.title}
        />
      </Grid>
    </Grid>
  );
};

export default MovieInformation;
