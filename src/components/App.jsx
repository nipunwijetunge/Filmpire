import { CssBaseline } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Actors, MovieInformation, Movies, NavBar, Profile } from ".";

const App = () => (
  <div>
    <CssBaseline />
    <NavBar />
    <main>
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
