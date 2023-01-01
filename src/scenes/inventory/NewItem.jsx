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

import DriverForm from "./forms/DriverForm";
import LEDForm from "./forms/LEDForm";

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

  const categories = {
    DRIVER: {
      name: "Driver",
      element: (
        <DriverForm key={"Driver"} product={product} dispatch={dispatch} />
      ),
    },
    LED: {
      name: "LED",
      element: <LEDForm key={"LED"} product={product} dispatch={dispatch} />,
    },
    LENS: { name: "Lens", element: <h1 key={"Lens"}>Hi</h1> },
    METAL: { name: "Metal", element: <h1 key={"Metal"}>Hi</h1> },
    SCREWS: { name: "Screws", element: <h1 key={"Screw"}>Hi</h1> },
    WIRE: { name: "Wire", element: <h1 key={"Wire"}>Hi</h1> },
    TOOLS: { name: "Tools", element: <h1 key={"Tools"}>Hi</h1> },
    OTHER: { name: "Other", element: <h1 key={"Other"}>Hi</h1> },
  };

  const handleCategoryChange = (event) => {
    dispatch({
      type: ACTIONS.RESET
    })
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
            {Object.keys(categories).map((key) => (
              <MenuItem key={categories[key].name} value={categories[key].name}>
                {categories[key].name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {Object.keys(categories).map((key) => {
        if (categories[key].name === product.category) {
          return categories[key].element;
        }
      })}
    </FormContainer>
  );
};

export default NewItem;
