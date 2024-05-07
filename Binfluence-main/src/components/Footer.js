import React, { useContext } from "react";
import { Grid } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import RecyclingIcon from "@mui/icons-material/Recycling";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import { Link, useLocation } from "react-router-dom";
import { CouncilContext } from "./CouncilContext";

function Footer() {
  const location = useLocation();
  const { councilValue, councilName } = useContext(CouncilContext);
  return (
    <Grid
      sx={(t) => ({
        backgroundColor: t.palette.primary.light,
        bottom: 0,
        left: 0,
        right: 0,
        position: "fixed",
        zIndex: 9999,
      })}
      elevation={3}>
      <nav>
        <BottomNavigation showLabels value={location.pathname}>
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to={`/council/${encodeURIComponent(councilName).replace(
              /%20/g,
              "-"
            )}/home`}
            value={`/council/${encodeURIComponent(councilName).replace(
              /%20/g,
              "-"
            )}/home`}
          />

          <BottomNavigationAction
            disabled={!councilValue}
            label="My Bins"
            icon={<DeleteIcon />}
            component={Link}
            to={`/council/${encodeURIComponent(councilName).replace(
              /%20/g,
              "-"
            )}/my-bins`}
            value={`/council/${encodeURIComponent(councilName).replace(
              /%20/g,
              "-"
            )}/my-bins`}
          />

          <BottomNavigationAction
            disabled={!councilValue}
            label="Recycling"
            icon={<RecyclingIcon />}
            component={Link}
            to={`/council/${encodeURIComponent(councilName).replace(
              /%20/g,
              "-"
            )}/recycling`}
            value={`/council/${encodeURIComponent(councilName).replace(
              /%20/g,
              "-"
            )}/recycling`}
          />

          <BottomNavigationAction
            label="Scan QR"
            icon={<CameraAltIcon />}
            component={Link}
            to="/scan"
            value="/scan"
          />

          <BottomNavigationAction
            label="Contact"
            icon={<AlternateEmailIcon />}
            component={Link}
            to="/contact"
            value="/contact"
          />
        </BottomNavigation>
      </nav>
    </Grid>
  );
}

export default Footer;
