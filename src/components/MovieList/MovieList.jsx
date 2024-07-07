import React from "react";
import { Grid } from "@mui/material";

import useStyles from "./styles";
import { Movie } from "..";

const MovieList = ({ movies }) => {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {(movies?.results &&
        movies.results.map((movie, i) => (
          <Movie key={i} movie={movie} i={i} />
        ))) ||
        (movies?.cast &&
          movies.cast.map(
            (movie, i) =>
              movie.poster_path != null && (
                <Movie key={i} movie={movie} i={i} />
              ),
          ))}
    </Grid>
  );
};

export default MovieList;
