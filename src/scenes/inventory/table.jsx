import MainTable from "../../../components/mainTable";

const Table = ({data}) => {

  const columns = [
    {
      field: "id", headerName: "ID",
      flex: 0.1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "name", headerName: "Name", 
      flex: 1, 
      cellClassName: "name-column--cell" 
    },
    {
      field: "make", headerName: "Make", 
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "quantity",headerAlign: "right", align:"right", headerName: "Quantity", 
      flex: 1
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