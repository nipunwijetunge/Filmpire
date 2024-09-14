import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const Movie = ({ movie, i }) => {
  const { classes } = useStyles();

  return (
    <Grid item className={classes.movie} xs={12} sm={4} m={5} lg={3} xl={1.36}>
      <Grow in key={i} timeout={(i + 1) * 100}>
        <Link className={classes.link} to={`/movie/${movie.id}`}>
          <img
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://www.fillmurray.com/200/300"
            }
            alt={movie.title}
          />
          <Typography className={classes.title} variant="h5">
            {movie.title}
          </Typography>
          <Tooltip
            disableTouchListener
            title={`${Math.round(movie.vote_average * 10) / 10} / 10`}
          >
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
