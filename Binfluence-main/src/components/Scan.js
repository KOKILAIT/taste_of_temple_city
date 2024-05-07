/* eslint-disable */
import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import Html5QrcodePlugin from "../Html5QrcodePlugin.jsx";
import { useNavigate } from "react-router-dom";

function Scan() {
  const [decodedResults, setDecodedResults] = useState([]);
  const navigateToScannedUrl = useNavigate();
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    if (decodedText) {
      window.location.href = decodedText;
    }
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  return (
    <Stack>
      <Stack
        sx={{
          p: 1,
          textAlign: "center",
        }}>
        <Typography
          sx={(t) => ({ color: t.palette.primary.dark, fontWeight: "700" })}>
          Open your camera and scan your bin QR code
        </Typography>
      </Stack>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </Stack>
  );
}

export default Scan;
