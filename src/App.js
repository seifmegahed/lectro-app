import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Topbar from "./components/Topbar";
import Loading from "./components/Loading";

import { useAuth } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const NewProject = lazy(() => import("./scenes/projects/newProject"));
const Dashboard = lazy(() => import("./scenes/dashboard"));
const Projects = lazy(() => import("./scenes/projects"));
const Inventory = lazy(() => import("./scenes/inventory/"));
const InventoryNew = lazy(() => import("./scenes/inventoryNew/"));
const Accounts = lazy(() => import("./scenes/accounts/"));

const Suppliers = () => <Accounts type="Supplier" />;
const Clients = () => <Accounts type="Client" />;

function App() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [theme, colorMode] = useMode();
  const { currentUser } = useAuth();

  const queryClient = new QueryClient();

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
              m={isNonMobile ? "40px" : "20px"}
              maxWidth="700px"
              position="relative"
            >
              <Suspense fallback={<Loading />}>
                <QueryClientProvider client={queryClient}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/new-project" element={<NewProject />} />
                    <Route path="/items" element={<Inventory />} />
                    <Route path="/items-new/*" element={<InventoryNew />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                  </Routes>
                </QueryClientProvider>
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
