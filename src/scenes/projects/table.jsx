import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { 
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon ,
  LockOpenOutlined as LockOpenOutlinedIcon ,
  SecurityOutlined as SecurityOutlinedIcon 
} from "@mui/icons-material";

import MainTable from "../../components/mainTable";

const Table = ({data}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const columns = [
    {
      field: "id", headerName: "ID",
      flex: 0.1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "name", headerName: "Name", 
      flex: 0.6, 
      cellClassName: "name-column--cell" 
    },
    {
      field: "abrv", headerName: "Abreviation", 
      flex: 0.4,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "email", headerName: "Email", 
      flex: 1
    },
    {
      field: "access", headerName: "Access Level", 
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { access }}) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px"}}>
              {access}
            </Typography>
          </Box>
        )
      }
    },
  ]

  return (
    <MainTable 
      columns={columns}
      data={data}
    />
  )
}

export default Table