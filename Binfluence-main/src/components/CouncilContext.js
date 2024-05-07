import React, { createContext, useState } from "react";

const COUNCIL_VALUE_STORAGE_KEY = "councilValue";

export const CouncilContext = createContext();

export const CouncilProvider = ({ children }) => {
  const [councilValue, setCouncilValue] = useState(
    localStorage.getItem("councilValue") || null
  );
  return (
    <CouncilContext.Provider
      value={{
        councilValue,
        councilName: councilValue?.split(", ")[0],
        updateCouncilValue: setCouncilValue,
        saveCouncil() {
          localStorage.setItem(COUNCIL_VALUE_STORAGE_KEY, councilValue);
        },
        clearCouncil() {
          setCouncilValue(null);
          localStorage.removeItem(COUNCIL_VALUE_STORAGE_KEY);
        },
      }}
    >
      {children}
    </CouncilContext.Provider>
  );
};
