import { useState } from "react";

import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  Divider,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import NavButton from "../../components/navButton";
import FormContainer from "../../components/FormContainer";
import LabelContainer from "../../components/LabelContainer";

import { drivers } from "../../data/items";

import { tokens } from "../../theme";
import { ACTIONS } from "./index";

const Study = ({ dispatch, project }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleNext = () => {};

  const [expanded, setExpanded] = useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FormContainer>
      <Box
        sx={{
          gridColumn: "span 4",
        }}
      >
        {project.products.map((product, index) => (
          <Accordion
            key={product.name}
            expanded={expanded === `panel${index}`}
            onChange={handleAccordion(`panel${index}`)}
            sx={{
              backgroundImage: "none",
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            <Summary
              index={index + 1}
              name={product.name}
              quantity={product.quantity}
            />
            <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
              <DriverSelection product={product} dispatch={dispatch} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ gridColumn: "span 4" }}
      >
        <NavButton cb={() => dispatch({ type: ACTIONS.BACK })}>BACK</NavButton>
        <NavButton cb={handleNext}>CONTINUE</NavButton>
      </Box>
    </FormContainer>
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

const Summary = ({ index, name, quantity }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`panel${index}a-header`}
      id={`panel${index}a-header`}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="95%"
      >
        <Box width={isNonMobile ? "70%" : "100%"}>
          <Typography variant="h4" color="text.secondary">
            {index}. {name}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem></Divider>
        {isNonMobile && (
          <Box>
            <Typography sx={{ color: "text.secondary" }}>
              Quantity: {quantity}
            </Typography>
          </Box>
        )}
      </Box>
    </AccordionSummary>
  );
};

const DriverSelection = ({ product, dispatch }) => {
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

export default Study;
