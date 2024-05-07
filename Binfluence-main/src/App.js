import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import MyBins from "./components/MyBins";
import Scan from "./components/Scan";
import GoTo from "./components/GoTo";

import { CouncilProvider } from "./components/CouncilContext";

import { Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Contact from "./components/Contact";

const LazyRecycling = lazy(() => import("./components/Recycling"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route
          path="/*"
          element={
            <>
              <CouncilProvider>
                <Header />
                <Paper
                  sx={(t) => ({
                    mt: 7,
                    mb: 16,
                    mx: 4,
                    p: 4,
                    backgroundColor: t.palette.primary.light,
                    borderRadius: "20px",
                    minHeight: `calc(100vh - ${t.spacing(36)})`,
                  })}
                >
                  <Routes>
                    <Route path="/goto" element={<GoTo />} />
                    <Route path="/landing" element={<Home />} />
                    <Route
                      path="/council/:councilName/home"
                      element={<Home />}
                    />
                    <Route
                      path="/council/:councilName/my-bins"
                      element={<MyBins />}
                    />
                    <Route
                      path="/council/:councilName/my-bins/:binType"
                      element={<MyBins />}
                    />

                    <Route
                      path="/council/:councilName/recycling"
                      element={
                        <Suspense
                          fallback={
                            <Stack
                              sx={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CircularProgress />
                            </Stack>
                          }
                        >
                          <LazyRecycling />
                        </Suspense>
                      }
                    />

                    <Route
                      path="go-to?/council/:councilName/my-bins/:binType"
                      element={<GoTo />}
                    />

                    <Route path="/scan" element={<Scan />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </Paper>
                <Footer />
              </CouncilProvider>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
