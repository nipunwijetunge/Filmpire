import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/system";

import useStyles from "./styles";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top rated" },
  { label: "Upcoming", value: "upcoming" },
];
const demoCategories = [
  { label: "Comedy", value: "comedy" },
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Drama", value: "drama" },
  { label: "Sci-Fi", value: "sci-fi" },
];

const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";

const redLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const SideBar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const { classes } = useStyles();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt="Filmpire Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => {}} Lis>
              {/* <ListItemIcon>
                <img
                  src={blueLogo}
                  alt={label}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => {}} Lis>
              {/* <ListItemIcon>
                <img
                  src={blueLogo}
                  alt={label}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  );
};

export default SideBar;
