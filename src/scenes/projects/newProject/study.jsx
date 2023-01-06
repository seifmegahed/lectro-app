import { useState } from "react";

import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import NavButton from "../../../components/navButton";
import FormContainer from "../../../components/FormContainer";
import DriverData from "./driverData";

import { tokens } from "../../../theme";
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
        minWidth="270px"
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
              <DriverData product={product} dispatch={dispatch} />
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

export default Study;
