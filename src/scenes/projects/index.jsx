import Header from "../../components/Header";
import { Box , Fab , useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Table from "./table";
import { usersData } from '../../data/mockData'
import { Add } from "@mui/icons-material"
import { Link } from "react-router-dom";

const Projects = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  // States

  return (
    <Box m="20px" position="relative" display="flex" flexDirection="column">
      <Header title="PROJECTS" subtitle="" />
      <Link to="/new-project">
        <Fab
          sx={{
            position: "fixed",
            right: "30px",
            top: "80px",
            color: `${colors.grey[900]}`,
            backgroundColor: `${colors.greenAccent[500]}`,
            "&:hover": {
              backgroundColor: `${colors.greenAccent[400]}`,
            },
          }}
          >
          <Add fontSize="large"/>
        </Fab>
      </Link>
      <Table data={usersData} />
    </Box>
  );
};

export default Projects;
