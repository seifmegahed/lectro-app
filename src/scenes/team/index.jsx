import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { usersData } from '../../data/mockData'

import { 
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon ,
  LockOpenOutlined as LockOpenOutlinedIcon ,
  SecurityOutlined as SecurityOutlinedIcon 
} from "@mui/icons-material";

import Header from "../../components/Header";

const Team = () => {
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
    <Box m="20px">
      <Header title="TEAM" subtitle="Team data" />
      <Box
        m="40px 0 0 0"
        height="95vh"
        backgroundColor= {colors.primary[700]}
        borderRadius= "5px"
        sx={{
          "& .MuiDataGrid-root" : {
            border: "none"
          } ,
          "& .MuiDataGrid-cell" : {
            borderBottom: "none"
          } ,
          "& .MuiDataGrid-virtualScroller" : {
            transform: "none"
          },
          "& .MuiDataGrid-footerContainer" : {
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
            color: `${colors.grey[100]} !important`,
          },

        }}
      >
        <DataGrid 
          rows={usersData}
          columns={columns}
          disableDensitySelector
          disableColumnFilter
          components={{ Toolbar: GridToolbar}}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          autoPageSize
          pagination
        />
      </Box>
    </Box>
  )
}

export default Team