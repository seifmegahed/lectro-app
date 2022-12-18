 import { Box , useTheme } from "@mui/material"
 import { DataGrid , GridToolbar } from "@mui/x-data-grid"
 import { tokens } from "../theme"
 
 const MainTable = ({columns, data }) =>{

  

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  
  return(
    <Box
      height="95vh"
      backgroundColor= {colors.primary[700]}
      mt="30px"
      p="30px"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      borderRadius="10px"
      sx={{
        "& .MuiDataGrid-root" : {
          border: "none",
        } ,
        "& .MuiDataGrid-cell" : {
          cursor: "pointer",
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