import React, { useEffect, useState } from "react";
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
  Pagination,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  ArrowBack,
  FavoriteOutlined,
  Remove,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useStyles from "./styles";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { MovieList } from "../index";
import { userSelector } from "../../features/auth";

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      movie_id: id,
      list: "recommendations",
      page,
    });
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id),
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id),
    );
  }, [watchlistMovies, data]);

  const addToFavorite = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      },
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchListed,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
        },
      },
    );

    setIsMovieWatchListed((prev) => !prev);
  };

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

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} md={6} lg={4} className={classes.posterContainer}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average.toFixed(2)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt={name}
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              .map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character}
                      </Typography>
                    </Grid>
                  ),
              )
              .slice(0, 6)}
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "2rem" }}
        >
          {/*<div className={classes.buttonsContainer}>*/}
          <Grid item>
            <ButtonGroup size="medium" varient="outlined" spacing={2}>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={data?.homepage}
                endIcon={<Language />}
              >
                Website
              </Button>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${data?.imdb_id}`}
                endIcon={<MovieIcon />}
              >
                IMDB
              </Button>
              <Button
                onClick={() => setOpen(true)}
                href="#"
                endIcon={<Theaters />}
              >
                Trailer
              </Button>
            </ButtonGroup>
          </Grid>

          <Grid item>
            <ButtonGroup size="medium" varient="outlined">
              {console.log(isMovieFavorited)}
              <Button
                onClick={addToFavorite}
                endIcon={
                  isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                }
              >
                {isMovieFavorited ? "Remove" : "Favourite"}
              </Button>
              <Button
                onClick={addToWatchlist}
                endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}
              >
                {isMovieWatchListed ? "Watchlist" : "Watchlist"}
              </Button>
              <Button
                endIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ borderColor: "primary.main" }}
              >
                <Typography
                  component={Link}
                  to="/"
                  color="inherit"
                  variant="subtitle2"
                  sx={{ textDecoration: "none" }}
                >
                  Back
                </Typography>
              </Button>
            </ButtonGroup>
          </Grid>
          {/*</div>*/}
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {/*  loop through the recommended movies */}
        {recommendations ? (
          <>
            <MovieList movies={recommendations} />
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="outlined"
              color="primary"
              size="large"
              count={recommendations?.total_pages}
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
      <Modal
        closeAfterTransition
        className={classes.model}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className={classes.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          ></iframe>
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
