import React, { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import { CouncilContext } from "./CouncilContext";

function Header() {
  const { councilValue, councilName } = useContext(CouncilContext);

  return (
    <Grid
      position="relative"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        pb: 5,
      }}>
      <AppBar>
        <Toolbar
          position="static"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Grid
              sx={{
                display: "flex",
                alignItems: "cneter",
                justifyContent: "center",
              }}></Grid>

            <Grid>
              <IconButton
                sx={(t) => ({
                  color: t.palette.primary.dark,
                })}>
                <img
                  src="/images/logo.png"
                  alt="logo"
                  style={{ height: "35px", width: "35px" }}
                />
              </IconButton>
              <IconButton sx={(t) => ({ color: t.palette.primary.dark })}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "600" }}>
                  Binfluence
                </Typography>
              </IconButton>
            </Grid>

            <Grid>
              <IconButton
                disabled
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ color: "white" }}>
                <MenuIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Grid>
          </Grid>
          <Typography
            sx={(t) => ({
              color: t.palette.primary.dark,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "100%",
              fontWeight: 600,
            })}>
            {councilValue ? `Your council is: ${councilName} ` : ""}
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default Header;
