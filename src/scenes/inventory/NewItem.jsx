import {
  Select,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  useTheme,
  Typography,
} from "@mui/material";
import { useReducer } from "react";

import DriverForm from "./forms/DriverForm";
import FormContainer from "../../components/FormContainer";
import { tokens } from "../../theme";

export const ACTIONS = {
  RESET: "reset",
  UPDATE: "update",
};

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

const NewItem = ({ changeTab, dispatch }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [product, dispatchProduct] = useReducer(reducer, { category: "" });

  const handleCategoryChange = (event) => {
    dispatchProduct({
      type: ACTIONS.UPDATE,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <FormContainer>
      <Box sx={{ gridColumn: "span 4" }}>
        <Typography variant="h3" mb="20px">New Item</Typography>
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
        <DriverForm dispatch={dispatch} dispatchProduct={dispatchProduct} product={product} changeTab={changeTab} />
      )}
    </FormContainer>
  );
};

export default NewItem;
