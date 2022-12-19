import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material"
import { Add, Close } from "@mui/icons-material"
import { tokens } from "../../theme"
import { useState } from "react"
import { productsCategories } from "../../data/products"

const ProductsForm = ({ next, back, data, updateData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [products, setProducts] = useState(data);

  const [error, setError] = useState(false);
  const vertical = "bottom";
  const horizontal = "right";
  const handleClose = () => {
    setError(false);
  };

  const handleNext = () => {
    var valid = true;
    products.forEach((product) => {
      if (product.type === "" || product.name === "" || product.amount === "")
        valid = false;
    });
    if (!valid) {
      setError(true);
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
      <Snackbar
        open={error}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
      >
        <Alert severity="error">Please Fill All Required Data</Alert>
      </Snackbar>
      {products.map((input, index) => (
        <Box
          key={index}
          position="relative"
          p="20px"
          border={`1px Solid ${colors.grey[800]}`}
          borderRadius="10px"
          display="grid"
          gap="20px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            gridColumn: "span 4",
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
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
                value={input.type || ""}
                onChange={(event) => handleSelectChange(event, index)}
                sx={{
                  backgroundColor: `${colors.grey[900]}`,
                }}
              >
                {/* <MenuItem disabled value=""></MenuItem> */}
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
              <InputLabel id={`selectProductLabel-${index}`}>
                Product
              </InputLabel>
              <Select
                labelId={`selectProductLabel-${index}`}
                label="Product"
                name="name"
                onChange={(event) => handleFormChange(index, event)}
                value={input.name || ""}
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
            sx={{
              gridColumn: "span 2",
            }}
          >
            <TextField
              name="amount"
              label="Amount"
              value={input.amount}
              onChange={(event) => handleFormChange(index, event)}
              sx={{
                width: "50%",
                input: {
                  backgroundColor: `${colors.grey[900]}`,
                  borderRadius: "4px",
                },
              }}
            />
          </Box>
          <Box
            display="flex"
            position="absolute"
            bottom="28px"
            right="20px"
            justifyContent="end"
          >
            {products.length - 1 === index ? (
              <Button
                onClick={() => addFields()}
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
            ) : (
              <Button
                onClick={() => removeProduct(index)}
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
            )}
          </Box>
        </Box>
      ))}

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          gridColumn: "span 4",
        }}
      >
        <Button
          variant="cointained"
          onClick={handleBack}
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
  )
}

export default ProductsForm
