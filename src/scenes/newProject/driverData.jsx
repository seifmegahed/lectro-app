import {
  Box,
  useTheme,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";

import LabelContainer from "../../components/LabelContainer";

import { tokens } from "../../theme";

import { ACTIONS } from "./index";
import { drivers } from "../../data/items";

const DriverData = ({ product, dispatch }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const driver = product.bom.driver;
  const driversData = getDrivers(driver.power);

  const handleDriverChange = (event) => {
    const name = event.target.value;
    dispatch({
      type: ACTIONS.UPDATE_PRODUCT_DRIVER,
      payload: {
        id: product.id,
        field: "name",
        value: name,
      },
    });
  };

  const handleMakeChange = (event) => {
    const make = event.target.value;
    const options = driversData.drivers.filter(
      (driver) => driver.make === make
    );
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
    </LabelContainer>
  );
};

const getDrivers = (power) => {
  const driversData = drivers.filter(
    (driver) => power <= driver.power && driver.power <= power * 1.5
  );

  const makes = [];

  driversData.map((item) => {
    if (!makes.includes(item.make)) makes.push(item.make);
    return null;
  });

  return {
    makes: makes,
    drivers: driversData,
  };
};

export default DriverData