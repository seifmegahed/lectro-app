import { Box, Typography, useMediaQuery } from "@mui/material";

import { itemFields } from "../../data/fields";
import FormContainer from "../../components/FormContainer";

import AutoForm from "../../components/AutoForm";
import useInventory from "../../contexts/InventoryContext";

const EditItem = () => {
  const { updatePage, selectedItem, PAGES } = useInventory();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const returnHome = () => {
    updatePage(PAGES.ALL_ITEMS);
  };
  const category = selectedItem.category;
  return (
    <FormContainer>
      <Box  sx={{ gridColumn: "span 4" }}>
        <Box display="flex" flexDirection="row">
          {isNonMobile && (
            <Box
              width="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img
                src={selectedItem.imageUrl || "/images/imageplaceholder.png"}
                style={{ maxWidth: "100%", maxHeight: "70px" }}
                alt=""
              />
            </Box>
          )}
          <Box width="100%" display="flex"  justifyContent="space-between">
            <Typography variant="h3" mb="20px">
              Edit Item
            </Typography>
            <Typography variant="h3" mb="20px">
              {category}
            </Typography>
          </Box>
        </Box>
      </Box>

      <AutoForm
        initData={selectedItem}
        fields={itemFields[selectedItem.category]}
        returnHome={returnHome}
        collectionName="items"
        edit={true}
      />
    </FormContainer>
  );
};

export default EditItem;
