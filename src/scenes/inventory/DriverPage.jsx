import {
  Box,
  Typography,
  FormControl,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import FormContainer from "../../components/FormContainer";

const DriverPage = ({ items }) => {
  const productId = items.selectedProduct.id;
  const product = items.selectedProduct.data();

  return (
    <FormContainer>
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        sx={{ gridColumn: "span 4" }}
      >
        <Box width="100px" display="flex" alignItems="center">
          <img
            src={product.imageUrl || "/images/imageplaceholder.png"}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
        <Box display="flex" width="100%" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Typography color="text.secondary" variant="h5">
              {product.category}
            </Typography>
            <Typography color="text.primary" variant="h3">
              {product.name}
            </Typography>
          </Box>
          <Typography color="text.secondary">UID: {productId}</Typography>
        </Box>
      </Box>
      <Box sx={{ gridColumn: "span 2" }}></Box>
      <Table size="small" sx={{ gridColumn: "span 2", width: "100%" }}>
        <TableBody>
          <DataDisplay label="Power" data={`${product.power} W`} />
          <DataDisplay
            label="Input Voltage"
            data={
              product.inputVoltageMin === product.inputVoltageMax
                ? `${product.inputVoltageMax} V`
                : `${product.inputVoltageMin}-${product.inputVoltageMax} V`
            }
          />
          <DataDisplay
            label="Output Voltage"
            data={
              product.outputVoltageMin === product.outputVoltageMax
                ? `${product.outputVoltageMax} V`
                : `${product.outputVoltageMin}-${product.outputVoltageMax} V`
            }
          />
          <DataDisplay
            label="Output Current"
            data={
              product.outputCurrentMin === product.outputCurrentMax
                ? `${product.outputCurrentMax} mA`
                : `${product.outputCurrentMin}-${product.outputCurrentMax} mA`
            }
          />
        </TableBody>
      </Table>
    </FormContainer>
  );
};

const DataDisplay = ({ label, data }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography color="text.primary">{label}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography color="text.primary">{data}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default DriverPage;
