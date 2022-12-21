import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { Add, Close } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useState } from "react";
import { productsCategories } from "../../data/products";
import NavButton from "../../components/navButton";
import FormContainer from "../../components/FormContainer";

const ProductsForm = ({ next, back, data, updateData, triggerError }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [products, setProducts] = useState(data);

  const handleNext = () => {
    var valid = true;
    products.forEach((product) => {
      if (product.type === "" || product.name === "" || product.amount === "")
        valid = false;
    });
    if (!valid) {
      triggerError()
      return;
    }
    updateData(products);
    next();
  };

  const handleBack = () => {
    updateData(products);
    back();
  };

  const handleSelectChange = (event, index) => {
    const type = event.target.value;
    var data = [...products];
    const productCategory = productsCategories.filter(
      ({ name }) => name === type
    )[0];
    data[index].type = type;
    data[index].name = '';
    data[index].options = productCategory.products;
    setProducts(data);
  };

  const handleFormChange = (index, event) => {
    var data = [...products];
    data[index][event.target.name] = event.target.value;
    setProducts(data);
  };

  const removeProduct = (index) => {
    var data = [...products];
    data.splice(index, 1);
    setProducts(data);
  };

  const addFields = () => {
    let newfield = { type: "", name: "", amount: "", options: [""] };
    setProducts([...products, newfield]);
  };

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      {products.map((product, index) => (
        <FormContainer>
          <Box
            sx={{
              gridColumn: "span 2",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id={`selectTypeLabel-${index}`}>Type</InputLabel>
              <Select
                labelId={`selectTypeLabel-${index}`}
                label="Type"
                value={product.type || ""}
                onChange={(event) => handleSelectChange(event, index)}
                sx={{
                  backgroundColor: `${colors.grey[900]}`,
                }}
              >
                {productsCategories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
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
              <InputLabel id={`selectProductNameLabel-${index}`}>
                Product
              </InputLabel>
              <Select
                labelId={`selectProductNameLabel-${index}`}
                label="Product"
                name="name"
                onChange={(event) => handleFormChange(index, event)}
                value={product.name || ""}
                sx={{
                  backgroundColor: `${colors.grey[900]}`,
                }}
              >
                {products[index].options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ gridColumn: "span 4" }}
          >
            <TextField
              name="amount"
              label="Amount"
              value={product.amount}
              onChange={(event) => handleFormChange(index, event)}
              sx={{
                width: `${isNonMobile ? "25%" : "50%"}`,
                input: {
                  backgroundColor: `${colors.grey[900]}`,
                  borderRadius: "4px",
                },
              }}
            />
            {products.length - 1 === index ? (
              <AddButton colors={colors} cb={addFields} />
            ) : (
              <RemoveButton colors={colors} cb={() => removeProduct(index)} />
            )}
          </Box>
        </FormContainer>
      ))}

      <FormContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ gridColumn: "span 4" }}
        >
          <NavButton cb={handleBack}>BACK</NavButton>
          <NavButton cb={handleNext}>CONTINUE</NavButton>
        </Box>
      </FormContainer>
    </Box>
  );
};

const AddButton = ({ colors, cb }) => {
  return (
    <Button
      onClick={cb}
      sx={{
        minWidth: "40px",
        ":hover": {
          backgroundColor: `${colors.primary[700]}`,
        },
      }}
    >
      <Add
        fontSize="large"
        sx={{
          color: `${colors.grey[600]}`,
          ":hover": {
            color: `${colors.grey[400]}`,
          },
        }}
      />
    </Button>
  );
};

const RemoveButton = ({ colors, cb }) => {
  return (
    <Button
      onClick={cb}
      sx={{
        minWidth: "40px",
        ":hover": {
          backgroundColor: `${colors.primary[700]}`,
        },
      }}
    >
      <Close
        fontSize="large"
        sx={{
          color: `${colors.redAccent[700]}`,
          ":hover": {
            color: `${colors.redAccent[500]}`,
          },
        }}
      />
    </Button>
  );
};

export default ProductsForm;
