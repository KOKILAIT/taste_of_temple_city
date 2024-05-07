import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Drawer = ({
  title,
  children,
  isOpen,
  onIsOpenChange,
  peek = false,
  height = 500,
}) => (
  <Stack
    sx={(t) => ({
      backgroundColor: t.palette.primary.light,
      borderTop: 2,
      borderTopRightRadius: "20px",
      borderTopLeftRadius: "20px",
      borderColor: t.palette.primary.main,
      bottom: 0,
      left: 0,
      right: 0,
      position: "fixed",
      zIndex: 99,
      overflow: "hidden",
      transition: "all 200ms ease",
      transform: `translateY(calc(${
        isOpen ? "-56px" : `100% - ${peek * 96}px`
      }))`,
      display: "flex",
      gap: 1,
      height: typeof height === 'number' ? `${height}px` : height,
    })}>
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
      <IconButton onClick={() => onIsOpenChange(!isOpen)}>
        {isOpen ? (
          <KeyboardArrowDownIcon
            sx={(t) => ({ color: t.palette.primary.main })}
          />
        ) : (
          <KeyboardArrowUpIcon
            sx={(t) => ({ color: t.palette.primary.main })}
          />
        )}
      </IconButton>
      <Typography
        sx={{
          color: "darkslategray",
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center",
          flexGrow: 1,
          p: 1,
        }}>
        {title}
      </Typography>
    </Grid>
    <Stack>{children}</Stack>
  </Stack>
);

export default Drawer;
