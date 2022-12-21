import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";


import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Loading from "./components/Loading";

const waitTimeMs = 1000;

const NewProject = lazy(() =>
  wait(waitTimeMs).then(() => import("./scenes/newProject"))
);
const Dashboard = lazy(() =>
  wait(waitTimeMs).then(() => import("./scenes/dashboard"))
);
const Projects = lazy(() =>
  wait(waitTimeMs).then(() => import("./scenes/projects"))
);
const Clients = lazy(() =>
  wait(waitTimeMs).then(() => import("./scenes/clients"))
);

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapse = (val) => {
    setIsCollapsed(val);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isCollapsed={isCollapsed} toggle={collapse} />
          <main className="content">
            <Topbar collapse={collapse} />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/new-project" element={<NewProject />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

const wait = (timeMs) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
};
