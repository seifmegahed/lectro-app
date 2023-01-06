import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box, Typography } from "@mui/material";

import Topbar from "./components/Topbar";
import Loading from "./components/Loading";

import { useAuth } from "./contexts/AuthContext";

const NewProject = lazy(() => import("./scenes/projects/newProject"));
const Dashboard = lazy(() => import("./scenes/dashboard"));
const Projects = lazy(() => import("./scenes/projects"));
const Inventory = lazy(() => import("./scenes/inventory/"));
const Accounts = lazy(() => import("./scenes/accounts/"));

const Suppliers = () => <Accounts type="Supplier" />;
const Clients = () => <Accounts type="Client" />;

function App() {
  const [theme, colorMode] = useMode();
  const { currentUser } = useAuth();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="app" display="flex">
        <Topbar />
        {!!currentUser ? (
          <Box
            className="content"
            pt="85px"
            maxWidth="700px"
            position="relative"
          >
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/new-project" element={<NewProject />} />
                <Route path="/items" element={<Inventory />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
