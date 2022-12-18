import Header from "../../components/Header";
import { Box } from "@mui/material";
import Form from "./form";
import Table from "./table";
import { useState } from "react";

const Clients = () => {
  
  // States
  const [project , setProject] = useState({
    id: "",
    client: "",
    name: "",
    po: "",
    amount: "",
    date: ""
  })
  const updateProject = (newProject) => {
    setProject(newProject)
  }
  return (
    <Box m="20px" position="relative">
      <Box display="flex" flexDirection="column">
        <Header title="PROJECTS" subtitle="" />
        <Form 
          project={project}
          updateProject={updateProject}
        />
        <Table tools={false}/>
      </Box>
    </Box>
  );
};

export default Clients;
