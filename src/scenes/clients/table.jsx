import {clients} from "../../data/accounts";
import MainTable from "../../components/mainTable";

const Table = () => {

  const columns = [
    {
      field: "name", headerName: "Client Name",
      headerAlign: "center",
      align: "center"
    }
  ]

  return (
    <MainTable
    tools={false}
    columns={columns}
    data={clients}
    />
  )
}

export default Table