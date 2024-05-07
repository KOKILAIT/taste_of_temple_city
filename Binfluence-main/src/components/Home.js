import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import l from "lodash";

import { Check as RememberCouncilIcon } from "@mui/icons-material";
import { Autocomplete, Button, Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InfoIcon from "@mui/icons-material/Info";
import { CouncilContext } from "./CouncilContext";
import councils from "../data/councils";
import { generateCouncilLabel } from "../utils/councilLabel";

const data = l.flatten(
  councils.map((council) =>
    council.regions.map((region) => ({
      council: council.name,
      suburbs: region.region,
      post_codes: region.postCodes,
    }))
  )
);

const decodeCouncil = (councilValue) => {
  if (!councilValue) return null;
  const [council, suburbs, post_codes] = councilValue.split(", ");
  return {
    council,
    suburbs,
    post_codes,
    label: councilValue,
  };
};

const transformedData = data.map((item) => ({
  ...item,
  label: generateCouncilLabel(item),
}));

function Home() {
  const {
    councilValue,
    councilName,
    saveCouncil,
    clearCouncil,
    updateCouncilValue,
  } = useContext(CouncilContext);

  const [localCouncilValue, setLocalCouncilValue] = useState(
    decodeCouncil(councilValue)
  );
  // console.log({ localCouncilValue });

  const [drawerOffset, setDrawerOffset] = useState(0);

  const [isOpen, setIsOpen] = useState(!councilValue);

  const navigateToBin = useNavigate();
  const navigate = useNavigate();

  const typographyRef = useRef(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      const t = typographyRef.current;
      if (!t) return;
      const rect = t.getBoundingClientRect();

      const positionFromDocumentTop = rect.top + window.scrollY + rect.height;

      setDrawerOffset(positionFromDocumentTop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  useEffect(() => {
    setLocalCouncilValue(decodeCouncil(councilValue));

    if (councilValue) {
      const encodedCouncilName = encodeURIComponent(councilName).replace(
        /%20/g,
        "-"
      );
      navigate(`/council/${encodedCouncilName}/home`);
    }
  }, [councilValue, councilName, navigate]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Stack gap={2} position={"relative"}>
          <Typography
            ref={typographyRef}
            variant="body1"
            sx={{
              color: "darkslategray",
              fontSize: "14px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Thank you for taking the first step in helping to reduce waste in
            our environment.
          </Typography>

          {councilValue && (
            <Typography
              variant="body1"
              sx={{
                color: "darkslategray",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Your council is:
            </Typography>
          )}
          {councilName && (
            <Typography
              variant="body1"
              sx={{
                color: "darkslategray",
                fontSize: "16px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {councilName}
            </Typography>
          )}
          {!!councilValue && (
            <Stack
              sx={{
                posistion: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginY: 1,
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                height: "32px",
              }}
            >
              <Button
                sx={(t) => ({ width: "100%", color: t.palette.primary.dark })}
                onClick={() => {
                  saveCouncil();
                  navigateToBin(
                    `/council/${encodeURIComponent(councilName).replace(
                      /%20/g,
                      "-"
                    )}/my-bins`
                  );
                }}
                variant="contained"
                startIcon={<RememberCouncilIcon />}
              >
                Yes, This is my council, Remember.
              </Button>
            </Stack>
          )}

          {!!councilValue && (
            <Stack
              sx={{
                posistion: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginY: 1,
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                height: "32px",
              }}
            >
              <Button
                sx={{ width: "100%" }}
                onClick={() => {
                  clearCouncil();
                  setIsOpen(true);
                  navigate("/landing");
                }}
                variant="outlined"
                color="error"
              >
                No, Search Again.
              </Button>
            </Stack>
          )}
        </Stack>
        <div style={{ flex: 1 }}>
          <Drawer
            peek
            isOpen={isOpen}
            onIsOpenChange={setIsOpen}
            title="Search For My Council"
            height={`calc(100% - ${drawerOffset}px - 56px - 10px)`}
          >
            <Grid
              sx={(t) => ({
                backgroundColor: t.palette.primary.main,
                width: "100%",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                gap: 2,
              })}
            >
              <Box
                sx={(t) => ({
                  backgroundColor: t.palette.primary.light,
                  borderRadius: "4px",
                  flex: 1,
                })}
              >
                <Autocomplete
                  value={localCouncilValue}
                  onChange={(_, newValue) => setLocalCouncilValue(newValue)}
                  options={transformedData}
                  ListboxProps={{ style: { maxHeight: 250 } }}
                  isOptionEqualToValue={(a, b) => l.isEqual(a, b)}
                  filterOptions={(options, { inputValue }) => {
                    return options.filter(
                      (option) =>
                        option.council
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        option.suburbs
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        option.post_codes.includes(inputValue)
                    );
                  }}
                  getOptionLabel={(option) =>
                    `${option.council}, ${option.suburbs}, ${option.post_codes}`
                  }
                  renderOption={(props, option) => (
                    <li {...props}>
                      <span style={{ fontWeight: "bold" }}>
                        {option.council}
                      </span>
                      , {option.suburbs}, {option.post_codes}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search Here ..."
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Stack>
              <Typography variant="caption" paddingLeft={2} display="flex">
                <InfoIcon fontSize="small" />
                Search Your Council Name, Postcode or Suburb
              </Typography>
            </Stack>
            <Stack
              sx={{
                position: "relative",
                paddingX: 5,
                paddingY: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  borderColor: "GrayText",
                  borderRadius: "5px",
                  paddingX: 4,
                  paddingY: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  {!localCouncilValue && (
                    <Stack>
                      <Typography
                        sx={(t) => ({
                          color: t.palette.primary.dark,
                          fontWeight: "600",
                        })}
                      >
                        Please enter your Council.
                      </Typography>
                    </Stack>
                  )}
                  {localCouncilValue && (
                    <Stack
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "40px",
                      }}
                    >
                      <Typography> Your council is :</Typography>
                      <Typography sx={{ fontWeight: "600" }}>
                        {localCouncilValue.council}
                      </Typography>
                      <Typography>Search again to change it.</Typography>
                    </Stack>
                  )}
                </Box>
              </Stack>
            </Stack>

            <Button
              sx={(t) => ({
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: t.palette.primary.main,
                color: "white",
                paddingY: "6px",
                width: "100%",
                borderRadius: "10px 10px 0px 0px",
                lineHeight: 3,
                fontWeight: "700",
                "&:hover": {
                  backgroundColor: t.palette.primary.main,
                },
                "&:focus": {
                  backgroundColor: t.palette.primary.main,
                },
              })}
              disabled={!localCouncilValue}
              onClick={() => {
                updateCouncilValue(localCouncilValue.label);
                setIsOpen(!isOpen);
              }}
            >
              Confirm
            </Button>
          </Drawer>
        </div>
      </div>
    </>
  );
}
export default Home;
