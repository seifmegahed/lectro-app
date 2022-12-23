import {
  Select,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  useTheme,
  TextField,
} from "@mui/material";
import { useReducer, useState } from "react";

import FormContainer from "../../../components/FormContainer";
import { tokens } from "../../../theme";

const categories = [
  "Driver",
  "LED",
  "Lens",
  "Metal",
  "Screws",
  "Wire",
  "Tools",
  "Other",
];

const ACTIONS = {
  RESET: "reset",
  UPDATE: "update",
};

function reducer(product, action) {
  switch (action.type) {
    case ACTIONS.RESET:
      return {};
    case ACTIONS.UPDATE:
      return {
        ...product,
        [action.payload.field]: action.payload.value,
      };
    default:
      return product;
  }
}

const NewItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [product, dispatch] = useReducer(reducer, { category: "" });

  const handleCategoryChange = (event) => {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <FormContainer>
      <Box sx={{ gridColumn: "span 2" }}>
        <FormControl fullWidth>
          <InputLabel id={"selectItemCategoryLabel"}>Category</InputLabel>
          <Select
            labelId="selectItemCategoryLabel"
            label="Category"
            name="category"
            value={product.category || ""}
            onChange={handleCategoryChange}
            sx={{
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {product.category === "Driver" && (
        <DriverForm dispatch={dispatch} product={product} />
      )}
    </FormContainer>
  );
};

const DriverForm = ({ dispatch, product }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (event) => {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <>
      <TextField
        label="Make"
        name="make"
        value={product.make || ""}
        onChange={handleChange}
        sx={{
          gridColumn: "span 2",
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
      />
      <TextField
        label="Quantity"
        name="quantity"
        value={product.quantity || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 2",
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
      />
    </>
  );
};

export default NewItem;
