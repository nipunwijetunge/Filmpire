import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useGetActorsQuery,
  useGetActorRelatedMoviesQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { MovieList } from "../index";

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorsQuery(id);
  const { data: movies } = useGetActorRelatedMoviesQuery({ id, page });
  const { classes } = useStyles();
  const navigate = useNavigate();

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
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

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
          <Typography variant="body2" align="justify" paragraph>
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
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
          >
            IMDB
          </Button>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            variant="text"
          >
            BACK
          </Button>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        {movies ? (
          <>
            <MovieList movies={movies} numberOfMovies={18} />
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="outlined"
              color="primary"
              size="large"
              count={`${movies?.total_pages}`}
              showFirstButton
              showLastButton
              page={page}
              onChange={handleChange}
            />
          </>
        ) : (
          <Box>Sorry! nothing was found.</Box>
        )}
      </Box>
    </Grid>
  );
};

export default Actors;
