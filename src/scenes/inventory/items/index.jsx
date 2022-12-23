import Header from '../../../components/Header'
import { Box } from '@mui/system'
import Table from './table'
import { drivers } from '../../../data/items'

const Items = () => {
  return (
  <Box m="20px" maxWidth="700px">
    <Box display="flex" gap="10px" flexDirection="column">
      <Header title="Items in Store" subtitle="" />
      <Table data={drivers}/>
    </Box>
  </Box>
  )
}

export default Items