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

import {
  productsCategories,
  products as allProducts,
} from "../../data/products";

import {ACTIONS} from "./index"

import NavButton from "../../components/navButton";
import FormContainer from "../../components/FormContainer";

const ProductsForm = ({ data, dispatch, updateData, triggerError }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [products, setProducts] = useState(data);

  const handleNext = () => {
    var valid = true;
    products.forEach((product) => {
      if (product.type === "" || product.name === "" || product.quantity === "")
        valid = false;
    });
    if (!valid) {
      triggerError();
      return;
    }
    updateData(products);
    dispatch({type: ACTIONS.NEXT})
  };

  const handleBack = () => {
    updateData(products);
    dispatch({type: ACTIONS.BACK})
  };

  const handleSelectChange = (index, event) => {
    const type = event.target.value;
    var data = [...products];
    const productCategory = productsCategories.filter(
      ({ name }) => name === type
    )[0];
    const quantity = data[index].quantity
    data[index] = {
      type: type,
      options: productCategory.products,
      quantity: quantity,
      name: "",
    };
    setProducts(data);
  };

  const handleProductSelectChange = (index, event) => {
    const productName = event.target.value;
    var data = [...products];
    const selectedProduct = allProducts.filter(
      product => product.name === productName
    )[0];
    data[index].name = selectedProduct.name
    data[index].power = selectedProduct.power
    data[index].bom = selectedProduct.bom
    setProducts(data)
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

  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { name: "", type: "", quantity: "", options: [''] },
    ]);
  };

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      {products.map((product, index) => (
        <FormContainer key={index}>
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
                onChange={(event) => handleSelectChange(index, event)}
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
                onChange={(event) => handleProductSelectChange(index, event)}
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
              label="Quantity"
              name="quantity"
              value={product.quantity || ''}
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
              <AddButton colors={colors} cb={addProduct} />
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
