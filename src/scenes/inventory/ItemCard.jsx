import FormContainer from "../../components/FormContainer";

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

import { useState } from "react";
import { MoreVert } from "@mui/icons-material";

import { PAGES } from "../../reducers/inventoryReducer";
import useInventory from "../../contexts/InventoryContext";

const ItemCard = ({ product, handleDelete }) => {
  const { updatePage, updateSelectedItem, items } = useInventory();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [moreMenu, setMoreMenu] = useState(null);

  const open = Boolean(moreMenu);

  const handleMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMoreMenu(null);
  };
  const handleSelectProduct = () => {
    updateSelectedItem(product);
    updatePage(PAGES.ITEM_PAGE);
  };
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
              src={product.imageUrl || "/images/imageplaceholder.png"}
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
              {product.name}
            </Typography>
            <Typography variant={isNonMobile ? "h5" : "h6"}>
              {product.category} - {product.make}
            </Typography>
          </Box>
          {isNonMobile && (
            <Box display="flex" flexDirection="column" textAlign="right">
              <Typography variant="h6">
                Quantity: {product.quantity || "0"}
              </Typography>
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
                    console.log(items);
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
                  Return
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
