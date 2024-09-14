import React, { useState } from "react";
import { Box, CircularProgress, Typography, Pagination } from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB";
import { FeaturedMovie, MovieList } from "..";

const Movies = () => {
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory,
  );

  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data?.results.length) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name. <br /> Please search for something
          else.
        </Typography>
      </Box>
    );
  }

  if (error) return `An error has occurred: ${error}`;

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={19} excludeFirst />
      <Pagination
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        variant="outlined"
        color="primary"
        size="large"
        count="500"
        showFirstButton
        showLastButton
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};

export default Movies;
