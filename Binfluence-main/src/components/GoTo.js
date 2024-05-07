import { useSearchParams, Navigate } from "react-router-dom";
import { CouncilContext } from "./CouncilContext";
import { useContext, useEffect } from "react";
import { generateCouncilLabel } from "../utils/councilLabel";

// Sample URL: http://localhost:3000/goto?council=Australian%20Captital%20Territory&post_codes=2602&suburbs=Ainslie&bin=Recycling-Bin
// Should turn into: http://localhost:3000/council/Australian-Captital-Territory/my-bins/Recycling-Bin
const GoTo = () => {
  const [params] = useSearchParams();
  const council = params.get("council");
  const post_codes = params.get("post_codes");
  const suburbs = params.get("suburbs");
  const bin = params.get("bin");

  const councilLabel = generateCouncilLabel({ council, post_codes, suburbs });
  const { updateCouncilValue } = useContext(CouncilContext);

  useEffect(() => {
    updateCouncilValue(councilLabel);
  }, [updateCouncilValue, councilLabel]);

  return (
    <Navigate
      to={`/council/${encodeURIComponent(council).replace(
        /%20/g,
        "-"
      )}/my-bins/${encodeURIComponent(bin).replace(/%20/g, "-")}`}
    />
  );
};

export default GoTo;
