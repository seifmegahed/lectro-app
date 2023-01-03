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

import { tokens } from "../../theme";
import FormContainer from "../../components/FormContainer";
import { itemData } from "../../data/items";

import ItemForm from "./ItemForm";

export const ACTIONS = {
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
      type: ACTIONS.RESET,
    });
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
      <Box sx={{ gridColumn: "span 4" }}>
        <Typography variant="h3" mb="20px">
          New Item
        </Typography>
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
            {Object.keys(itemData).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <ItemForm product={product} dispatch={dispatch} />
    </FormContainer>
  );
};

export default NewItem;
