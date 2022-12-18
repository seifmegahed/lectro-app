import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./scenes/dashboard";
import Projects from "./scenes/projects";
import Clients from "./scenes/clients";
import NewProject from "./scenes/newProject";

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
          <Sidebar isCollapsed={isCollapsed} toggle={collapse}/>
          <main className="content">
            <Topbar collapse={collapse} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/new-project" element={<NewProject />} />
              {/* <Route path='/pie' element={<Pie />} /> */}
              {/* <Route path='/faq' element={<FAQ />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
