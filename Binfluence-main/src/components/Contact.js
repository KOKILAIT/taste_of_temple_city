import React from "react";
import { Stack, Typography } from "@mui/material";

const Contact = () => {
  return (
    <>
      <Stack
        gap={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography
          sx={(t) => ({
            color: t.palette.primary.main,
            fontSize: "18px",
            fontWeight: "700",
            textAlign: "center",
            lineHeight: 2,
          })}>
          Thank you for testing the Binfluence app.
          <br /> Please send feedback to
          <br />
          <a
            style={{ textDecoration: "none", color: "#355210" }}
            href="mailto:binfluence.aus@gmail.com">
            {" "}
            binfluence.aus@gmail.com
          </a>
        </Typography>
      </Stack>
    </>
  );
};

export default Contact;
