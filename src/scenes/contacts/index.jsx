import { Box } from "@mui/material";
import { mockDataContacts } from '../../data/mockData'

import Header from "../../components/Header";
import MainTable from "../../components/mainTable";

const Contacts = () => {
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
      <MainTable 
        columns={columns}
        data={mockDataContacts}
      />
    </Box>
  )
}

export default Contacts