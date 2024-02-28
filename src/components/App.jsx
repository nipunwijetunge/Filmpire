import { CssBaseline } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";

import useStyles from "./styles";

import { Actors, MovieInformation, Movies, NavBar, Profile } from ".";

const App = () => (
  <div className={classes.root}>
    <CssBaseline />
    <NavBar />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Routes>
        <Route exact path="/movies/:id" element={<MovieInformation />} />
        <Route exact path="/actors/:id" element={<Actors />} />
        <Route exact path="/" element={<Movies />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
    </main>
  </div>
);

export default App;
