import React, { useEffect, useState } from "react";
import {
  AppBarIco,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  AppBar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import { setUser, userSelector } from "../../features/auth";
import { Search, SideBar } from "..";
import { movieApi, fetchToken, createSessionId } from "../../utils/index";

import useStyles from "./styles";

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("request_token");
  const session_id = localStorage.getItem("session_id");

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (session_id) {
          const { data: userData } = await movieApi.get(
            `/account?session_id=${session_id}`,
          );

          dispatch(setUser(userData));
        } else {
          const session_id = await createSessionId();

          const { data: userData } = await movieApi.get(
            `/account?session_id=${session_id}`,
          );

          dispatch(setUser(userData));
        }
      }
    };

    loginUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
