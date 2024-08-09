import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
  Pagination,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "..";
import currentGenreOrCategory from "../../features/currentGenreOrCategory";

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
      {/*<h4>{genreIdOrCategoryName}</h4>*/}
      <MovieList movies={data} numberOfMovies={20} />
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
