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

const Study = ({ back, next, data }) => {
  const [studyData, setStudyData] = useState([]);

  useEffect(() => {
    const tempProducts = [];
    data.map((product) => {
      var temp = products.filter(
        (productInner) => productInner.name === product.name
      )[0];
      temp.quantity = product.amount;
      tempProducts.push(temp);
      return null;
    });
    setStudyData(tempProducts);
  }, [data]);

  const handleNext = () => {
    getDrivers(100);
  };

  return (
    <FormContainer>
      <ProductAccordion data={studyData} />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ gridColumn: "span 4" }}
      >
        <NavButton cb={back}>BACK</NavButton>
        <NavButton cb={handleNext}>CONTINUE</NavButton>
      </Box>
    </FormContainer>
  );
};

const ProductAccordion = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [expanded, setExpanded] = useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const Summary = ({ index, name, quantity }) => {
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

  const DriverSelection = ({ power, index }) => {
    const driversData = getDrivers(power);
    
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [make, setMake] = useState('');
    const [driver, setDriver] = useState('')


    const handleDriverChange = (event) => {
      setDriver(event.target.value)
    }

    const handleMakeChange = (event) => {
      setMake(event.target.value)
      setAvailableDrivers(
        driversData.drivers
        .filter(driver => driver.make === event.target.value)
      )
    }

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
              value={make || ''}
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
              value={driver || ''}
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
    <Box
      sx={{
        gridColumn: "span 4",
      }}
    >
      {data.map((product, index) => (
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
            <DriverSelection power={product.power} index={index}/>
            <LabelContainer label="LED Selection">hell</LabelContainer>
            <LabelContainer label="Bill of Materials">hello</LabelContainer>
            <LabelContainer label="Technical Specifications">
              hell
            </LabelContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
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
export default Study;
