import React, { lazy, Suspense, useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box, Typography } from "@mui/material";

import Topbar from "./components/Topbar";
import Loading from "./components/Loading";
import { auth } from "./firebase-config";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const NewProject = lazy(() => import("./scenes/newProject"));
const Dashboard = lazy(() => import("./scenes/dashboard"));
const Projects = lazy(() => import("./scenes/projects"));
const Clients = lazy(() => import("./scenes/clients"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Items = lazy(() => import("./scenes/inventory/items"));

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const collapse = (val) => {
    setIsCollapsed(val);
  };

  const [userSignedIn, setUserSignedIn] = useState(false);
  const [user, setUser] = useState({});

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  function signOutUser() {
    signOut(auth);
  }

  // Triggers when the auth state change
  function updateUser(val) {
    if (val) {
      setUserSignedIn(true);
      setUser(val);
    } else {
      setUserSignedIn(false);
      setUser({});
    }
  }

  useEffect(() => {
    // Subscribe to Auth State Change and updateUser
    onAuthStateChanged(auth, updateUser);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loading />}>
          <div className="app">
            {userSignedIn && (
              <Sidebar
                isCollapsed={isCollapsed}
                toggle={collapse}
                user={user}
              />
            )}
            <main className="content">
              <Topbar
                collapse={collapse}
                isSignedIn={userSignedIn}
                signIn={signIn}
                signOut={signOutUser}
              />
              <Box mb="85px"></Box>
              <Routes>
                {userSignedIn ? (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/new-project" element={<NewProject />} />
                    <Route path="/items" element={<Items />} />
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
                        <Typography variant="h2">
                          Welcome!
                        </Typography>
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
            </main>
          </div>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
