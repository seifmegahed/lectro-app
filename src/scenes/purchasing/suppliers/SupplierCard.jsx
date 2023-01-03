import FormContainer from "../../../components/FormContainer";

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

import useSuppliers from "../../../contexts/SuppliersContext";

const SupplierCard = ({ supplier }) => {
  const { updatePage, updateSelectedSupplier, suppliers, PAGES } =
    useSuppliers();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [moreMenu, setMoreMenu] = useState(null);

  const open = Boolean(moreMenu);

  const handleMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMoreMenu(null);
  };
  const handleSelectedSupplier = () => {
    updateSelectedSupplier(supplier);
    // updatePage(PAGES.SUPPLIER_PAGE);
  };
  return (
    <FormContainer padding="15px">
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        height="60px"
        sx={{ gridColumn: "span 4" }}
      >
        <Box width="60px" display="flex" justifyContent="center">
          <Typography
            variant={isNonMobile ? "h1" : "h2"}
            onClick={handleSelectedSupplier}
            sx={{ cursor: "pointer" }}
          >
            {supplier.number}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography
              variant={isNonMobile ? "h3" : "h4"}
              onClick={handleSelectedSupplier}
              sx={{ cursor: "pointer" }}
            >
              {supplier.englishName}
            </Typography>
            <Typography variant={isNonMobile ? "h5" : "h6"}>
              {supplier.name}
            </Typography>
          </Box>
          {isNonMobile && (
            <Box display="flex" flexDirection="column" textAlign="right">
              <Typography variant="h6">{supplier.taxNumber || "0"}</Typography>
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
                    handleMenuClose();
                  }}
                >
                  Save
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
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

export default SupplierCard;
