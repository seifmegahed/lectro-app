import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  Divider,
  InputLabel,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { products } from "../../data/products";
import NavButton from "../../components/navButton";
import FormContainer from "../../components/FormContainer";

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
    console.log("hello");
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

const ProductAccordion = ({ data, index }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [expanded, setExpanded] = useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="95%"
            >
              <Box width={isNonMobile ? "25%" : "70%"}>
                <Typography variant="h4" color="text.secondary">
                  {index + 1}. {product.name}
                </Typography>
              </Box>
              {isNonMobile && (
                <Divider orientation="vertical" flexItem></Divider>
              )}
              {isNonMobile && (
                <Box width="25%">
                  <Typography sx={{ color: "text.secondary" }}>
                    Type: {product.type}
                  </Typography>
                </Box>
              )}
              {isNonMobile && (
                <Divider orientation="vertical" flexItem></Divider>
              )}
              {isNonMobile && (
                <Box>
                  <Typography sx={{ color: "text.secondary" }}>
                    Quantity: {product.quantity}
                  </Typography>
                </Box>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              display="grid"
              position="relative"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              gap="10px"
              p="10px"
              border={`1px Solid ${colors.grey[800]}`}
              borderRadius="10px"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <InputLabel
                sx={{
                  padding: "0 4px",
                  position: "absolute",
                  top: "-16px",
                  left: "20px",
                  backgroundColor: `${colors.grey[900]}`,
                }}
              >
                <Typography variant="h5">Driver</Typography>
              </InputLabel>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Study;
