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
import useInventory from "../../contexts/InventoryContext";
import { getFormatedDate } from "../../Utils/dateFormatting";

const DriverPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { selectedItem } = useInventory();

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
              src={selectedItem.imageUrl || "/images/imageplaceholder.png"}
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
              {selectedItem.category}
            </Typography>
            <Typography color="text.primary" variant="h3">
              {selectedItem.name}
            </Typography>
          </Box>
          {isNonMobile && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Typography color="text.secondary">{selectedItem.id}</Typography>
              <Typography color="text.secondary" variant="h5">
                {selectedItem.make}
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
          <DataDisplay label="Power:" data={`${selectedItem.power} W`} />
          <DataDisplay label="Make:" data={selectedItem.make} />
          <DataDisplay
            label="Data of Creation:"
            data={getFormatedDate(selectedItem.createdOn)}
          />
          <DataDisplay label="Created By:" data={selectedItem.createdBy} />
          <DataDisplay label="Country of Origin:" data={selectedItem.country} />
          <DataDisplay label="Type:" data={selectedItem.type} />
          <DataDisplay
            label="Input Voltage:"
            data={
              selectedItem.inputVoltageMin === selectedItem.inputVoltageMax
                ? `${selectedItem.inputVoltageMax} V`
                : `${selectedItem.inputVoltageMin}-${selectedItem.inputVoltageMax} V`
            }
          />
          <DataDisplay
            label="Output Voltage:"
            data={
              selectedItem.outputVoltageMin === selectedItem.outputVoltageMax
                ? `${selectedItem.outputVoltageMax} V`
                : `${selectedItem.outputVoltageMin}-${selectedItem.outputVoltageMax} V`
            }
          />
          <DataDisplay
            label="Output Current:"
            data={
              selectedItem.outputCurrentMin === selectedItem.outputCurrentMax
                ? `${selectedItem.outputCurrentMax} mA`
                : `${selectedItem.outputCurrentMin}-${selectedItem.outputCurrentMax} mA`
            }
          />
          {!!selectedItem.powerFactor && (
            <DataDisplay
              label="Power Factor:"
              data={`${selectedItem.powerFactor}%`}
            />
          )}
          {!!selectedItem.ipRating && (
            <DataDisplay
              label="IP Rating:"
              data={`IP${selectedItem.ipRating}`}
            />
          )}
          <DataDisplay
            label="Case Material:"
            data={selectedItem.caseMaterial}
          />
          {!!selectedItem.notes && (
            <DataDisplay label="Notes:" data={selectedItem.notes} />
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

export default DriverPage;
