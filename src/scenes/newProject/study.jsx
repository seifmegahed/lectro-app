import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { products } from "../../data/products";

const Study = ({ back, next, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
    <Box
      display="grid"
      p="30px"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      borderRadius="10px"
      gap="20px"
      sx={{
        backgroundColor: `${colors.primary[700]}`,
        "& > div": {
          gridColumn: isNonMobile ? undefined : "span 4",
        },
      }}
    >
      <Box
        sx={{
          gridColumn: "span 4",
        }}
      >
        {studyData.map((product, index) => (
          <Accordion key={product.name}>
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
                <Box width={isNonMobile ? "25%" : "50%"}>
                  <Typography>
                    {index + 1}. {product.name}
                  </Typography>
                </Box>
                {isNonMobile &&(
                  <Divider orientation="vertical" flexItem></Divider>
                )}
                {isNonMobile &&(   
                    <Box width="25%">
                      <Typography sx={{ color: "text.secondary" }}>
                        Type: {product.type}
                      </Typography>
                    </Box>
                )}
                {isNonMobile &&(
                  <Divider orientation="vertical" flexItem></Divider>
                )}
                <Box>
                  <Typography sx={{ color: "text.secondary" }}>
                    Quantity: {product.quantity}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem sx={{width: "100%"}}>
                  {product.quantity}
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          gridColumn: "span 4",
        }}
      >
        <Button
          variant="cointained"
          onClick={back}
          size="large"
          sx={{
            color: "#fcfcfc",
            width: "6rem",
            height: "2.5rem",
            backgroundColor: `${colors.blueAccent[300]}`,
            "&:hover": {
              backgroundColor: `${colors.blueAccent[400]}`,
            },
          }}
        >
          BACK
        </Button>
        <Button
          variant="cointained"
          onClick={handleNext}
          sx={{
            width: "6rem",
            height: "2.5rem",
            color: "#fcfcfc",
            backgroundColor: `${colors.blueAccent[500]}`,
            "&:hover": {
              backgroundColor: `${colors.blueAccent[400]}`,
            },
          }}
        >
          CONTINUE
        </Button>
      </Box>
    </Box>
  );
};

export default Study;
