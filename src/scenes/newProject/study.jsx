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
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { products } from "../../data/products";
import NavButton from "../../components/navButton";
import FormContainer from "../../components/FormContainer";
import LabelContainer from "../../components/LabelContainer";
import { drivers } from "../../data/items";

import { ACTIONS } from "./index";

const Study = ({ dispatch, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [studyData, setStudyData] = useState(data);

  const handleNext = () => {

  };

  const [expanded, setExpanded] = useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const DriverSelection = ({ index }) => {
    const driversData = getDrivers(studyData[index].bom.driver.power);

    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [driver, setDriver] = useState(data);

    const handleDriverChange = (event) => {
      setDriver((prev) => ({ ...prev, name: event.target.value }));
    };

    const handleMakeChange = (event) => {
      setDriver({ name: "", make: event.target.value });
      setAvailableDrivers(
        driversData.drivers.filter(
          (driver) => driver.make === event.target.value
        )
      );
    };

    return (
      <LabelContainer label="Driver Selection">
        <Box
          sx={{
            gridColumn: "span 2",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id={`selectMakeLabel-${index}`}>Make</InputLabel>
            <Select
              labelId={`selectMakeLabel-${index}`}
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
            <InputLabel id={`selectDriverLabel-${index}`}>Driver</InputLabel>
            <Select
              labelId={`selectDriverLabel-${index}`}
              label="Type"
              value={driver.name || ""}
              onChange={handleDriverChange}
              sx={{
                backgroundColor: `${colors.grey[900]}`,
              }}
            >
              {availableDrivers.map((driver) => (
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

  return (
    <FormContainer>
      <Box
        sx={{
          gridColumn: "span 4",
        }}
      >
        {studyData.map((product, index) => (
          <Accordion
            key={product.name}
            expanded={expanded === `panel${index}`}
            onChange={handleAccordion(`panel${index}`)}
            sx={{
              backgroundImage: "none",
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-header`}
              id={`panel${index}a-header`}
            >
              <Summary
                index={index + 1}
                name={product.name}
                quantity={product.quantity}
              />
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
              <DriverSelection index={index} />
              <LabelContainer label="LED Selection">hello</LabelContainer>
              <LabelContainer label="Bill of Materials">hello</LabelContainer>
              <LabelContainer label="Technical Specifications">
                hello
              </LabelContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ gridColumn: "span 4" }}
      >
        <NavButton cb={() => dispatch({type: ACTIONS.BACK})}>BACK</NavButton>
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
  );
};

export default Study;
