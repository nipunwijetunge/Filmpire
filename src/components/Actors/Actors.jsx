import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetActorsQuery } from "../../services/TMDB";
import useStyles from "./styles";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { MovieList } from "../index";

const Actors = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorsQuery(id);
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
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} md={6} lg={4} className={classes.posterContainer}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
          alt={data?.name}
        />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="flex-start"
        direction="column"
        lg={8}
      >
        <Grid item container direction="column">
          <Typography variant="h3" align="left" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" align="left" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" align="left" gutterBottom>
            {data?.biography}
          </Typography>
        </Grid>
        <Grid
          paddingX="3rem"
          item
          container
          direction="row"
          justifyContent="space-between"
          marginTop="2rem"
        >
          <Button variant="contained">IMDB</Button>
          <Button startIcon={<ArrowBack />} variant="text">
            BACK
          </Button>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        {data?.movie_credits ? (
          <MovieList movies={data.movie_credits} />
        ) : (
          <Box>Sorry! nothing was found.</Box>
        )}
      </Box>
    </Grid>
  );
};

export default Actors;
