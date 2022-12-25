import React, { lazy, Suspense, useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box, Typography } from "@mui/material";

import Topbar from "./components/Topbar";
import Loading from "./components/Loading";

import { useAuth } from "./contexts/AuthContext";

const NewProject = lazy(() => import("./scenes/newProject"));
const Dashboard = lazy(() => import("./scenes/dashboard"));
const Projects = lazy(() => import("./scenes/projects"));
const Clients = lazy(() => import("./scenes/clients"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Inventory = lazy(() => import("./scenes/inventory/"));

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentUser } = useAuth();

  
  const collapse = (val) => {
    setIsCollapsed(val);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loading />}>
          <Box className="app">
            {!!currentUser && (
              <Sidebar isCollapsed={isCollapsed} toggle={collapse} />
            )}
            <Box className="content">
              <Topbar collapse={collapse} />
              <Box pt="85px" pl="2vw" maxWidth="850px" position="relative">
                <Routes>
                  {!!currentUser ? (
                    <>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/new-project" element={<NewProject />} />
                      <Route path="/items" element={<Inventory />} />
                    </>
                  ) : (
                    <Route
                      path="/"
                      element={
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography variant="h2">Welcome!</Typography>
                        </Box>
                      }
                    />
                  )}
                  <Route
                    path="*"
                    element={
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <h2>Error: Page Not Found</h2>
                      </Box>
                    }
                  />
                </Routes>
              </Box>
            </Box>
          </Box>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
