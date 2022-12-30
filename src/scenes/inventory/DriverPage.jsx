import {
  Box,
  Typography,
  useMediaQuery,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import FormContainer from "../../components/FormContainer";

const DriverPage = ({ items }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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
        {isNonMobile && (
          <Box width="100px" display="flex" alignItems="center">
            <img
              src={product.imageUrl || "/images/imageplaceholder.png"}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>
        )}
        <Box display="flex" width="100%" justifyContent="space-between">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography color="text.secondary" variant="h5">
              {product.category}
            </Typography>
            <Typography color="text.primary" variant="h3">
              {product.name}
            </Typography>
          </Box>
          {isNonMobile && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Typography color="text.secondary">{productId}</Typography>
              <Typography color="text.secondary" variant="h5">
                {product.make}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {isNonMobile && <Box sx={{ gridColumn: "span 1" }}></Box>}
      <Table
        size="small"
        sx={{ gridColumn: `span ${isNonMobile ? "3" : "4"}`, width: "100%" }}
      >
        <TableBody>
          <DataDisplay label="Power:" data={`${product.power} W`} />
          <DataDisplay label="Make:" data={product.make} />
          <DataDisplay
            label="Data of Creation:"
            data={getFormatedDate(product.createdOn)}
          />
          <DataDisplay label="Created By:" data={product.createdBy} />
          <DataDisplay label="Country of Origin:" data={product.country} />
          <DataDisplay label="Type:" data={product.type} />
          <DataDisplay
            label="Input Voltage:"
            data={
              product.inputVoltageMin === product.inputVoltageMax
                ? `${product.inputVoltageMax} V`
                : `${product.inputVoltageMin}-${product.inputVoltageMax} V`
            }
          />
          <DataDisplay
            label="Output Voltage:"
            data={
              product.outputVoltageMin === product.outputVoltageMax
                ? `${product.outputVoltageMax} V`
                : `${product.outputVoltageMin}-${product.outputVoltageMax} V`
            }
          />
          <DataDisplay
            label="Output Current:"
            data={
              product.outputCurrentMin === product.outputCurrentMax
                ? `${product.outputCurrentMax} mA`
                : `${product.outputCurrentMin}-${product.outputCurrentMax} mA`
            }
          />
          {!!product.powerFactor && (
            <DataDisplay
              label="Power Factor:"
              data={`${product.powerFactor}%`}
            />
          )}
          {!!product.ipRating && (
            <DataDisplay label="IP Rating:" data={`IP${product.ipRating}`} />
          )}
          <DataDisplay label="Case Material:" data={product.caseMaterial} />
          {!!product.notes && (
            <DataDisplay label="Notes:" data={product.notes} />
          )}
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

// returns date in Mon dd, yyyy format
function getFormatedDate(val) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if(!!val.nanoseconds)
    var date = new Date(val.seconds * 1000);
  else
    var date = new Date(val.seconds);

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formatedDate = month + " " + day + ", " + year;
  return formatedDate;
}

export default DriverPage;
