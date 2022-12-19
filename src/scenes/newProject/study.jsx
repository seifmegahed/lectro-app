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
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { products } from "../../data/products";
import NavButton from "../../components/navButton";
import FormContainer from "../../components/FormContainer";
import LabelContainer from "../../components/LabelContainer";

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
              <Box width={isNonMobile ? "70%" : "100%"}>
                <Typography variant="h4" color="text.secondary">
                  {index + 1}. {product.name}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem></Divider>
              {isNonMobile && (
                <Box>
                  <Typography sx={{ color: "text.secondary" }}>
                    Quantity: {product.quantity}
                  </Typography>
                </Box>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{display:"flex",flexDirection:"column"}}>
            <LabelContainer label="Driver Selection">
              hello
            </LabelContainer>
            <LabelContainer label="LED Selection">
              hell
            </LabelContainer>
            <LabelContainer label="Bill of Materials">
              hello
            </LabelContainer>
            <LabelContainer label="Technical Specifications">
              hell
            </LabelContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Study;
