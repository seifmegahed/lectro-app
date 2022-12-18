import { Box } from "@mui/material";
import { mockDataInvoices } from '../../data/mockData'

import Header from "../../components/Header";
import MainTable from "../../components/mainTable";

const Invoices = () => {
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
      <MainTable 
        columns={columns}
        data={mockDataInvoices}
      />
    </Box>
  )
}

export default Invoices