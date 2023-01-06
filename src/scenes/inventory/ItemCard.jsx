import { useState } from "react";
import useInventory from "../../contexts/InventoryContext";

import { db } from "../../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

import {
  Box,
  Typography,
  IconButton,
  Popper,
  MenuItem,
  Paper,
  ClickAwayListener,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import FormContainer from "../../components/FormContainer";

const ItemCard = ({ item }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { updatePage, updateSelectedItem, PAGES } = useInventory();
  const [moreMenu, setMoreMenu] = useState(null);
  const { id, imageUrl, name, make, category, quantity } = item;
  const maxStringSize = 10;

  const title = isNonMobile
    ? name
    : name.length > maxStringSize
    ? name.substring(0, maxStringSize).trimEnd() + "..."
    : name;
  const subTitle = (make + "-" + category)

  const open = Boolean(moreMenu);

  const handleMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreMenu(null);
  };

  const handleSelectProduct = () => {
    updateSelectedItem(item);
    updatePage(PAGES.ITEM_PAGE);
  };

  const handleEditItem = () => {
    updateSelectedItem(item);
    updatePage(PAGES.EDIT_ITEM);
  };

  function handleDelete() {
    async function deleteData() {
      await deleteDoc(doc(db, "items", id));
    }
    deleteData();
  }

  return (
    <FormContainer padding="15px">
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        height={isNonMobile ? "80px" : "50px"}
        sx={{ gridColumn: "span 4" }}
      >
        <Box>
          <Checkbox
            inputProps={{ "aria-label": "checkbox" }}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        </Box>
        {isNonMobile && (
          <Box
            width="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={imageUrl || "/images/imageplaceholder.png"}
              style={{ maxWidth: "100%", maxHeight: "70px" }}
              alt=""
            />
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography
              variant={isNonMobile ? "h3" : "h4"}
              onClick={handleSelectProduct}
              sx={{ cursor: "pointer" }}
            >
              {title}
            </Typography>
            <Typography variant={isNonMobile ? "h5" : "h6"}>
              {subTitle}
            </Typography>
          </Box>
          {isNonMobile && (
            <Box display="flex" flexDirection="column" textAlign="right">
              <Typography variant="h6">Quantity: {quantity || "0"}</Typography>
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            id="moreMenuButton"
            aria-controls={open ? "moreMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenu}
          >
            <MoreVert fontSize="large" />
          </IconButton>
          <Popper
            id="moreMenu"
            aria-labelledby="moreMenuButton"
            anchorEl={moreMenu}
            open={open}
            onClose={handleMenuClose}
            placement="bottom-start"
          >
            <ClickAwayListener onClickAway={handleMenuClose}>
              <Paper>
                <MenuItem
                  onClick={() => {
                    handleEditItem();
                    handleMenuClose();
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                  }}
                >
                  Recieve
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                  }}
                >
                  Request
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDelete();
                    handleMenuClose();
                  }}
                  color="error"
                >
                  <Typography color="error">Delete</Typography>
                </MenuItem>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Box>
      </Box>
    </FormContainer>
  );
};

export default ItemCard;
