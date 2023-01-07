import { useState } from "react";

import { db } from "../../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import useInventory from "../../contexts/InventoryContext";
import FormContainer from "../../components/FormContainer";
import PopperMenu from "../../components/PopperMenu";

import { ARABIC_MENU } from "./AllItems";
import { useAuth } from "../../contexts/AuthContext";

const ItemCard = ({ item, toggleSelected }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { admin } = useAuth();
  const { setPage, setItem, setSelectedItems, PAGES } = useInventory();
  const [moreMenu, setMoreMenu] = useState(null);
  const { id, imageUrl, name, make, category, quantity, selected } = item;
  const maxStringSize = 10;
  const open = Boolean(moreMenu);

  const title = isNonMobile
    ? name
    : name.length > maxStringSize
    ? name.substring(0, maxStringSize).trimEnd() + "..."
    : name;
  const subTitle = make + "-" + category;

  const handleMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreMenu(null);
  };

  const visitItem = () => {
    setItem(item);
    setPage(PAGES.ITEM_PAGE);
  };

  const handleEditItem = () => {
    setItem(item);
    setPage(PAGES.EDIT_ITEM);
  };

  function handleDelete() {
    async function deleteData() {
      await deleteDoc(doc(db, "items", id));
    }
    deleteData();
  }

  const eznEdafa = () => {
    setSelectedItems([item]);
    setPage(PAGES.EZN_EDAFA);
  };

  const menuItems = [
    {
      label: ARABIC_MENU.EDAFA,
      arabic: true,
      callback: eznEdafa,
    },
    {
      label: ARABIC_MENU.SARF,
      arabic: true,
      callback: () => console.log("SARF"),
    },
    {
      label: ARABIC_MENU.TALAB,
      arabic: true,
      callback: () => console.log("TALAB"),
    },
    {
      label: ARABIC_MENU.KHOROOG,
      arabic: true,
      callback: () => console.log("KHOROOG"),
    },
    {
      label: "Details",
      callback: visitItem,
    },
    {
      label: "Edit",
      callback: handleEditItem,
    },
    {
      label: "Delete",
      callback: handleDelete,
      color: "error",
      disabled: !admin,
    },
  ];

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
            checked={selected || false}
            onChange={() => toggleSelected(id)}
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
              onClick={visitItem}
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
          <PopperMenu
            handleClose={handleMenuClose}
            element={moreMenu}
            placement="bottom-end"
            menuItems={menuItems}
          />
        </Box>
      </Box>
    </FormContainer>
  );
};

export default ItemCard;
