import {
  Box,
  useTheme,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

import LabelContainer from "../../../components/LabelContainer";

import { tokens } from "../../../theme";

import { ACTIONS } from "./index";
import { drivers } from "../../../data/items";

const DriverData = ({ product, dispatch }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const driver = product.bom.driver;
  const driversData = getDrivers(driver.power);

  const handleDriverChange = (event) => {
    const name = event.target.value;
    const details = drivers.filter((driver) => driver.name === name)[0];
    dispatch({
      type: ACTIONS.UPDATE_PRODUCT_DRIVER,
      payload: {
        id: product.id,
        field: "name",
        value: name,
      },
    });
    dispatch({
      type: ACTIONS.UPDATE_PRODUCT_DRIVER,
      payload: {
        id: product.id,
        field: "details",
        value: details,
      },
    });
  };

  const handleMakeChange = (event) => {
    const make = event.target.value;
    const options = driversData.drivers.filter(
      (driver) => driver.make === make
    );
    console.log(options);
    dispatch({
      type: ACTIONS.UPDATE_PRODUCT_DRIVER,
      payload: {
        id: product.id,
        field: "make",
        value: make,
      },
    });
    dispatch({
      type: ACTIONS.UPDATE_PRODUCT_DRIVER,
      payload: {
        id: product.id,
        field: "options",
        value: options,
      },
    });
    dispatch({
      type: ACTIONS.UPDATE_PRODUCT_DRIVER,
      payload: {
        id: product.id,
        field: "name",
        value: "",
      },
    });
    dispatch({
      type: ACTIONS.UPDATE_PRODUCT_DRIVER,
      payload: {
        id: product.id,
        field: "details",
        value: "",
      },
    });
  };

  return (
    <LabelContainer label="Driver Selection">
      <Box
        sx={{
          gridColumn: "span 2",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id={`selectMakeLabel-${product.id}`}>Make</InputLabel>
          <Select
            labelId={`selectMakeLabel-${product.id}`}
            label="Type"
            value={driver.make || ""}
            onChange={handleMakeChange}
            sx={{
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            {driversData.makes.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          gridColumn: "span 2",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id={`selectDriverLabel-${product.id}`}>Driver</InputLabel>
          <Select
            labelId={`selectDriverLabel-${product.id}`}
            label="Type"
            value={driver.name || ""}
            onChange={handleDriverChange}
            sx={{
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            {driver.options.map((driver) => (
              <MenuItem key={driver.id} value={driver.name}>
                {driver.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Table size="small" sx={{ gridColumn: "span 4", width: "100%" }}>
        <TableBody>
          <DataDisplay
            label="Quantity/Product"
            data={driver.quantity}
          />
          <DataDisplay
            label="Needed Quantity"
            data={driver.quantity * product.quantity}
          />
          {driver.details && (
            <>
              <DataDisplay
                label="Available Quantity"
                data={driver.details.quantity}
              />
              <DataDisplay
                label="Cost"
                data={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: driver.details.currency,
                }).format(driver.details.cost)}
              />
              <DataDisplay
                label="Total Cost"
                data={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: driver.details.currency,
                }).format(driver.details.cost * product.quantity)}
              />
              <DataDisplay label="Power" data={`${driver.details.power} W`} />
              <DataDisplay
                label="Output Voltage"
                data={`${driver.details.outputVoltage} V`}
              />
              <DataDisplay
                label="Output Current"
                data={`${driver.details.current} mA`}
              />
              <DataDisplay label="Case Type" data={driver.details.caseType} />
            </>
          )}
        </TableBody>
      </Table>
    </LabelContainer>
  );
};

const getDrivers = (power) => {
  const driversData = drivers.filter(
    (driver) => power <= driver.power && driver.power <= power * 1.5
  );

  const makes = [];
  const driversOptions = [];

  driversData.map((item) => {
    if (!makes.includes(item.make)) makes.push(item.make);
    return null;
  });

  driversData.map((item) => {
    driversOptions.push({ name: item.name, id: item.id, make: item.make });
    return null;
  });

  return {
    makes: makes,
    drivers: driversOptions,
  };
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

export default DriverData;
