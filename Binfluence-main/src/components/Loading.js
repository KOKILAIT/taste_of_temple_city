import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Paper } from "@mui/material";

function Loading() {
  const [loadingProgress, setloadingProgress] = useState(0);
  const [visibleLoading, setVisibleLoading] = useState(false);

  const navigateToNextPage = useNavigate();

  useEffect(() => {
    const delay = 8000;

    const timeoutNavigation = setTimeout(() => {
      navigateToNextPage("/landing");
    }, delay);

    return () => clearTimeout(timeoutNavigation);
  }, [navigateToNextPage]);

  useEffect(() => {
    const visibleLoadingTime = setTimeout(() => {
      setVisibleLoading(true);
    }, 1000);

    return () => clearTimeout(visibleLoadingTime);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setloadingProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Paper
      sx={(t) => ({
        mt: 11,
        mb: 4,
        mx: 4,
        p: 4,
        backgroundColor: t.palette.primary.light,
        borderRadius: "20px",
        minHeight: `calc(100vh - ${t.spacing(36)})`,
      })}>
      <Grid
        sx={(t) => ({
          backgroundColor: t.palette.primary.light,
          borderRadius: "13px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 18,
          px: 8,
          position: "relative",
        })}>
        <img
          src="/images/logo.png"
          alt="logo"
          style={{ width: "100px", height: "100px", pb: 4 }}
        />
        <Typography
          sx={(t) => ({
            color: t.palette.primary.main,
            fontSize: "22px",
            fontWeight: "700",
            pb: 2,
          })}>
          Binfluence
        </Typography>
        <Box sx={{ width: "100%" }}>
          {visibleLoading && (
            <LinearProgress variant="determinate" value={loadingProgress} />
          )}
        </Box>
      </Grid>
    </Paper>
  );
}

export default Loading;
