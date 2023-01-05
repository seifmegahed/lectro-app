import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box, Typography } from "@mui/material";

import Topbar from "./components/Topbar";
import Loading from "./components/Loading";

import { useAuth } from "./contexts/AuthContext";

const NewProject = lazy(() => import("./scenes/newProject"));
const Dashboard = lazy(() => import("./scenes/dashboard"));
const Projects = lazy(() => import("./scenes/projects"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Inventory = lazy(() => import("./scenes/inventory/"));
const Accounts = lazy(() => import("./scenes/accounts/"));
const Suppliers = () => <Accounts type="Supplier" />;
const Clients = () => <Accounts type="Client" />;
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
              {!!currentUser ? (
                <Box p="85px 2vw" maxWidth="850px" position="relative">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/new-project" element={<NewProject />} />
                    <Route path="/items" element={<Inventory />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route
                      path="/*"
                      element={<Navigate to="/" />}
                    />
                  </Routes>
                </Box>
              ) : (
                <Routes>
                  <Route
                    path="*"
                    element={
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        padding="150px"
                      >
                        <Typography variant="h2">Welcome!</Typography>
                      </Box>
                    }
                  />
                </Routes>
              )}
            </Box>
          </Box>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
