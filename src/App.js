import React, { lazy, Suspense, useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "./components/Topbar";
import Loading from "./components/Loading";

import { app } from "./firebase-config";
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
    await signInWithPopup(getAuth(), provider);
  }

  function signOutUser() {
    signOut(getAuth());
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
    onAuthStateChanged(getAuth(), updateUser);
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
                signIn={signIn}
                signOut={signOutUser}
              />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/new-project" element={<NewProject />} />
                <Route path="/items" element={<Items />} />
              </Routes>
            </main>
          </div>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
