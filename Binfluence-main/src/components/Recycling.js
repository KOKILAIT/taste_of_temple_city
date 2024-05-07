import React, { useState, useContext } from "react";

import { Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { CouncilContext } from "./CouncilContext";
import councils from "../data/councils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import { TextField, IconButton } from "@mui/material";

function Recycling() {
  const [searchTerm, setSearchTerm] = useState("");

  const { councilValue, councilName } = useContext(CouncilContext);
  if (!councilValue) return null;
  const { prodcuts } = councils.find((c) => c.name === councilName);

  const filteredProducts = prodcuts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
  );

  return (
    <Stack>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "10px",
        }}>
        <Typography
          sx={(t) => ({
            color: t.palette.primary.dark,
            fontWeight: "600",
          })}>
          Recycling from A to Z
        </Typography>
      </Grid>

      <Grid
        sx={(t) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}>
        <Grid
          sx={(t) => ({
            backgroundColor: t.palette.primary.main,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            p: 1,
            gap: 1,
            width: "100%",
          })}>
          <Box
            sx={(t) => ({
              backgroundColor: t.palette.primary.light,
              borderRadius: "4px",
              width: "100%",
            })}>
            <TextField
              fullWidth
              type="text"
              placeholder="Enter items"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    position="end"
                    sx={{
                      visibility: searchTerm ? "visible" : "hidden",
                      position: "absolute",
                      right: "2px",
                    }}
                    onClick={() => setSearchTerm("")}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {filteredProducts.map((product, i) => (
        <Accordion
          key={i}
          sx={{ marginTop: "10px", backgroundColor: "white", borderRadius: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ alignItems: "center" }}>
            <img
              src={"/images/glass_bin.png"}
              alt=""
              style={{ marginRight: "10px", width: "40px", height: "40px" }}
            />
            <Typography
              sx={{
                paddingTop: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                lineHeight: "1.2",
              }}
              gutterBottom>
              {product.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {Object.entries(product)
                .filter(([label]) => label !== "name")
                .filter(([, value]) => value)
                .map(([label, value], i, arr) => (
                  <Grid
                    key={i}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      p: 2,
                      overflow: "hidden",
                      borderBottom:
                        i === arr.length - 1 ? "none" : "1px solid #e0e0e0",
                    }}>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "gray",
                        textAlign: "left",
                      }}>
                      {label}
                    </Typography>
                    <Typography
                      component={
                        value.toLowerCase().includes("http") ? "a" : "span"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      href={value}
                      color={
                        value.toLowerCase().includes("http") ? "blue" : "black"
                      }
                      style={{ textDecoration: "none" }}
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        maxWidth: "50%",
                        overflow: "hidden",
                        textAlign: "right",
                      }}>
                      {value}
                    </Typography>
                  </Grid>
                ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}

export default Recycling;
