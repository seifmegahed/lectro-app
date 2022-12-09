import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from '../../data/mockData'

import { 
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon ,
  LockOpenOutlined as LockOpenOutlinedIcon ,
  SecurityOutlined as SecurityOutlinedIcon 
} from "@mui/icons-material";

import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const columns = [
    {
      field: "id", headerName: "ID",
      headerAlign: "center",
      align: "center"
    },
    {
      field: "name", headerName: "Name", 
      flex: 0.6, 
      cellClassName: "name-column--cell" 
    },
    {
      field: "phone", headerName: "Phone Number", 
      flex: 1, 
      cellClassName: "name-column--cell" 
    },
    {
      field: "email", headerName: "Email", 
      flex: 1
    },
    {
      field: "cost", headerName: "Cost", 
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "date", headerName: "Date", 
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
  ]

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
          "& .MuiCheckbox-root" : {
            color: `${colors.grey[200]} !important`,
          },

        }}
      >
        <DataGrid 
          rows={mockDataInvoices}
          columns={columns}
          disableDensitySelector
          disableColumnFilter
          checkboxSelection
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

export default Invoices