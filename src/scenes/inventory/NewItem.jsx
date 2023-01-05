import {
  Select,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  useTheme,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { tokens } from "../../theme";
import { itemFields } from "../../data/fields";
import FormContainer from "../../components/FormContainer";

import AutoForm from "../../components/AutoForm";
import useInventory from "../../contexts/InventoryContext";

const NewItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { updatePage, PAGES } = useInventory();
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const returnHome = () => {
    updatePage(PAGES.ALL_ITEMS);
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
            value={category || ""}
            onChange={handleCategoryChange}
            sx={{
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            {Object.keys(itemFields).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {!!category && (
        <AutoForm
          initData={{ category: category }}
          fields={itemFields[category]}
          returnHome={returnHome}
          collectionName="items"
        />
      )}
    </FormContainer>
  );
};

export default NewItem;
