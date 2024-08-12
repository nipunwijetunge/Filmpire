import React from "react";

import { Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

const Profile = () => {
  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <div>
      <Button color="inherit" onClick={logout}>
        Logout &nbsp; <ExitToApp />
      </Button>
    </div>
  );
};

export default Profile;
