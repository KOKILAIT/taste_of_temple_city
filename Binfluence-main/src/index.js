import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#80c12d",
      light: "#e2f1d0",
      dark: "#355210",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          ".MuiTouchRipple-root": {
            margin: 0,
          },
        },
      },
    },
    // MuiTabs: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiTabs-flexContainer": {
    //         gap: "20px",
    //       },
    //     },
    //   },
    // },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: "white",
          paddingX: "60px",
          paddingY: "0px",
          borderRadius: "3px",
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.light,
            color: "black",
          },
        }),
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
