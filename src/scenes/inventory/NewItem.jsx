import {
  Select,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  useTheme,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { tokens } from "../../theme";
import { itemFields } from "../../data/fields";
import FormContainer from "../../components/FormContainer";

import AutoForm from "../../components/AutoForm";
import useInventory from "../../contexts/InventoryContext";
import ImageUpload from "../../components/ImageUpload";

const NewItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setPage, setItem, addItem, setSelectedItems, PAGES } = useInventory();
  const [category, setCategory] = useState("");
  const [imageState, setImageState] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    let doesNotIncludeImage = true;
    if (category !== "") {
      const checkForImage = new Promise((resolve) => {
        resolve(
          itemFields[category].forEach((field) => {
            const state = field.name !== "image";
            doesNotIncludeImage &= state;
          })
        );
      });
      checkForImage.then(setImageState(!doesNotIncludeImage));
    }
  }, [category]);

  const imageData = (data) => {
    // console.log(data)
    setImageUrl(data.imageUrl)
  }

  const returnHome = (data) => {
    addItem(data);
    setItem(data);
    setSelectedItems([]);
    setPage(PAGES.ITEM_PAGE);
  };
  return (
    <FormContainer>
      <Box sx={{ gridColumn: "span 4" }}>
        <Typography variant="h3" mb="20px">
          New Item
        </Typography>
      </Box>
      {imageState && (
        <Box sx={{ gridColumn: "span 2", gridRow: "span 3" }}>
          <ImageUpload 
            storageFolder={`items/${category}`}
            returnImageData={imageData}
            initUrl={imageUrl}
          />
        </Box>
      )}
      <FormControl
        fullWidth
        sx={{ gridColumn: `span ${imageState ? "2" : "4"}` }}
      >
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
