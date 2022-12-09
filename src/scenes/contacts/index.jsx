import { Box , useTheme } from "@mui/material";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from '../../data/mockData'


import { 
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon ,
  LockOpenOutlined as LockOpenOutlinedIcon ,
  SecurityOutlined as SecurityOutlinedIcon 
} from "@mui/icons-material";

import Header from "../../components/Header";

const Contacts = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const columns = [
    {
      field: "id", headerName: "ID",
      flex: 0.5
    },
    { 
      field: "regisrarId",
      headerName: "Registrar ID"
    },
    {
      field: "name", headerName: "Name", 
      flex: 0.6, 
      cellClassName: "name-column--cell" 
    },
    {
      field: "email", headerName: "Email", 
      flex: 1
    },
    {
      field: "address", headerName: "Address", 
      flex: 1
    },
    {
      field: "city", headerName: "City", 
      flex: 1
    },
    {
      field: "zip", headerName: "Zip", 
      flex: 1
    },
  ]

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Referance" />
      <Box
        mt="40px"
        p="10px"
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
          "& .name-column--cell" : {
          },
          "& .MuiDataGrid-columnHeaders" : {
          },
          "& .MuiDataGrid-virtualScroller" : {
            transform: "none"
          },
          "& .MuiDataGrid-footerContainer" : {
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButtonBase-MuiButton-root" : {
            color: `${colors.grey[100]} !important`,
          }
        }}
      >
        <DataGrid 
          rows={mockDataContacts}
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

export default Contacts