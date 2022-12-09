 import { Box , useTheme } from "@mui/material"
 import { DataGrid , GridToolbar } from "@mui/x-data-grid"
 import { tokens } from "../theme"
 
 const MainTable = ({columns, data}) =>{
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return(
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
        rows={data}
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
  )
}

export default MainTable