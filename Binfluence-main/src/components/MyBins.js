import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import Drawer from "./Drawer";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CouncilContext } from "./CouncilContext";
import councils from "../data/councils";

import { Grid, Typography, Stack, ButtonBase } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function MyBins() {
  const navigate = useNavigate();
  const { binType: selectedBinType } = useParams();

  const [selectButton, setSelectButton] = useState(0);

  const [drawerOffset, setDrawerOffset] = useState(0);
  const titleRef = useRef(null);
  useLayoutEffect(() => {
    const handelResize = () => {
      const s = titleRef.current;
      if (!s) return;
      const rect = s.getBoundingClientRect();
      setDrawerOffset(rect.top + rect.height);
    };
    handelResize();
    window.addEventListener("resize", handelResize);
    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, []);

  const { councilValue } = useContext(CouncilContext);
  if (!councilValue) return null;
  const councilName = councilValue.split(",")[0];
  const { bins } = councils.find((c) => c.name === councilName);

  return (
    <>
      <Stack>
        <Typography
          ref={titleRef}
          sx={(t) => ({
            color: t.palette.primary.dark,
            fontSize: "18px",
            fontWeight: "700",
            textAlign: "center",
            paddingBottom: "10px",
          })}>
          My Council Bin Info
        </Typography>
        <Grid container wrap="wrap">
          {bins.map((bin, i) => (
            <Grid key={i} item xs={6}>
              <Link
                to={`/council/${encodeURIComponent(councilName).replace(
                  /%20/g,
                  "-"
                )}/my-bins/${encodeURIComponent(bin.type).replace(
                  /%20/g,
                  "-"
                )}`}
                style={{ textDecoration: "none" }}>
                <BinItem bin={bin} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Stack>
      {bins.map((bin, i) => {
        const items = bin[["canGoIn", "canNotGoIn"][selectButton]];
        return (
          <Drawer
            height={`calc(100vh - ${drawerOffset}px - 60px )`}
            key={i}
            isOpen={bin.type === selectedBinType}
            onIsOpenChange={() =>
              navigate(
                `/council/${encodeURIComponent(councilName).replace(
                  /%20/g,
                  "-"
                )}/my-bins`
              )
            }
            title={bin?.type}>
            <Grid>
              <Grid
                sx={(t) => ({
                  borderTop: 5,
                  borderLeft: 5,
                  borderRight: 5,
                  borderColor: t.palette.primary.main,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: t.palette.primary.main,
                  width: "100%",
                })}>
                <Tabs
                  sx={{
                    width: "100%",
                    "@media (min-width: 768px)": {
                      width: "60%",
                    },
                  }}
                  value={selectButton}
                  onChange={(_, newValue) => setSelectButton(newValue)}>
                  <Tab
                    sx={{
                      width: "50%",
                    }}
                    label="Can go in"
                  />
                  <Tab
                    sx={{
                      width: "50%",
                    }}
                    label="Can't go in"
                  />
                </Tabs>
              </Grid>

              <Box
                sx={(t) => ({
                  border: 5,
                  borderColor: t.palette.primary.main,
                  maxHeight: "550px",
                  overflowY: "auto",
                  height: "600px",
                })}>
                <Stack p={3} gap={2}>
                  {items &&
                    Array.isArray(items) &&
                    items.map((item, index) => (
                      <Typography
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: "14px",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          backgroundColor: "#f8f8f8",
                        }}>
                        {selectButton === 1 ? (
                          <CloseIcon sx={{ fontSize: "16px", color: "red" }} />
                        ) : (
                          <CheckIcon
                            sx={{ fontSize: "16px", color: "green" }}
                          />
                        )}
                        {item}
                      </Typography>
                    ))}

                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                    }}></Box>
                </Stack>
                <Box
                  sx={(t) => ({
                    position: "absolute",
                    bottom: "0px",
                    borderBottom: 5,
                    borderColor: t.palette.primary.main,
                    width: "100%",
                    height: "5px",
                  })}></Box>
              </Box>
            </Grid>
          </Drawer>
        );
      })}
    </>
  );
}

const BinItem = ({ bin }) => (
  <Stack
    spacing={2}
    component={ButtonBase}
    sx={{ width: "100%", placeItems: "center", p: 1 }}>
    <Typography
      sx={{
        backgroundColor: "green",
        color: "white",
        borderRadius: 2,
        fontWeight: 400,
        px: 1,
        whiteSpace: "nowrap",
      }}>
      {bin.type.replace(/-/g, " ")}
    </Typography>
    <img src={bin.image} alt="" style={{ width: "45%" }} />
  </Stack>
);
