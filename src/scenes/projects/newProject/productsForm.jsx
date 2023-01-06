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
import { tokens } from "../../../theme";

import {
  productsCategories,
  products as allProducts,
} from "../../../data/products";

import { ACTIONS } from "./index";

import NavButton from "../../../components/navButton";
import FormContainer from "../../../components/FormContainer";

const ProductsForm = ({
  project,
  dispatch,
  triggerError,
}) => {

  const handleNext = () => {
    var valid = true;
    project.products.forEach((product) => {
      if (product.type === "" || product.name === "" || product.quantity === "")
        valid = false;
    });
    if (!valid) {
      triggerError();
      return;
    }
    dispatch({ type: ACTIONS.NEXT });
  };

  const handleBack = () => {
    dispatch({ type: ACTIONS.BACK });
  };

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      {project.products.map((product, index) => (
        <ProductForm
          key={product.id}
          product={product}
          dispatch={dispatch}
          lastItem={project.products.length - 1 === index ? true : false}
        />
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

const ProductForm = ({ product, dispatch, lastItem }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const removeProduct = (id) => {
    dispatch({ type: ACTIONS.REMOVE_PRODUCT, payload: { id: id } });
  };

  const addProduct = () => {
    dispatch({ type: ACTIONS.ADD_PRODUCT });
  };

  const handleSelectChange = (id, event) => {
    const type = event.target.value;
    const options = productsCategories.filter(({ name }) => name === type)[0]
      .products;

      dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: {
        id: id,
        field: "type",
        value: type
      }})
      dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: {
        id: id,
        field: "options",
        value: options
      }})
      dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: {
        id: id,
        field: "name",
        value: ""
      }})
      dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: {
        id: id,
        field: "bom",
        value: []
      }})
  };

  const handleNameChange = (id, event) => {
    const name = event.target.value;
    const bom = allProducts.filter((product) => product.name === name)[0].bom;

    dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: {
      id: id,
      field: "name",
      value: name
    }})
    dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: {
      id: id,
      field: "bom",
      value: bom
    }})
  };

  const handleChange = (id, event) => {
    dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: {
      id: id,
      field: event.target.name,
      value: event.target.value
    }})
  }

  return (
    <FormContainer>
      <Box
        sx={{
          gridColumn: "span 2",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id={`selectTypeLabel-${product.id}`}>Type</InputLabel>
          <Select
            labelId={`selectTypeLabel-${product.id}`}
            label="Type"
            value={product.type || ""}
            onChange={(event) => handleSelectChange(product.id, event)}
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
          <InputLabel id={`selectProductNameLabel-${product.id}`}>
            Product
          </InputLabel>
          <Select
            labelId={`selectProductNameLabel-${product.id}`}
            label="Product"
            value={product.name || ""}
            onChange={((event) => handleNameChange(product.id, event))}
            sx={{
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            {product.options.map((option) => (
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
          type="number"
          value={product.quantity || ""}
          onChange={(event) => handleChange(product.id, event)}
          sx={{
            width: `${isNonMobile ? "25%" : "50%"}`,
            input: {
              backgroundColor: `${colors.grey[900]}`,
              borderRadius: "4px",
            },
          }}
        />
        {lastItem ? (
          <AddButton colors={colors} cb={addProduct} />
        ) : (
          <RemoveButton colors={colors} cb={() => removeProduct(product.id)} />
        )}
      </Box>
    </FormContainer>
  );
};

export default ProductsForm;
