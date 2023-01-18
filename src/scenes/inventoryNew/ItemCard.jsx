import { useState } from "react";
import { Link } from "react-router-dom";

import { getStorage, deleteObject } from "firebase/storage";

import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import FormContainer from "../../components/FormContainer";
import PopperMenu from "../../components/PopperMenu";

import { ARABIC_MENU } from "./AllItems";
import { useAuth } from "../../contexts/AuthContext";

const maxStringSize = 12;
const maxSubStringSize = 18;

const ItemCard = ({ item, toggleSelected, deleteHelperItem }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { admin } = useAuth();
  const [moreMenu, setMoreMenu] = useState(null);
  const { id, imageUrl, name, make, mpn, category, quantity, selected } = item;
  
  const open = Boolean(moreMenu);
  
  const collectionReferance = collection(db, "items");
  const documentReferance = doc(collectionReferance, id);
  
  const itemUrl = `item/${id}`;
  
  const title = isNonMobile
    ? name
    : name.length > maxStringSize
    ? name.substring(0, maxStringSize).trimEnd() + "..."
    : name;
  const temp = make + (!!mpn ? "-" + mpn : "");
  const subTitle = isNonMobile
    ? temp
    : temp.length > maxSubStringSize
    ? temp.substring(0, maxSubStringSize).trimEnd() + "..."
    : temp;

  const deleteMutation = useFirestoreDocumentDeletion(documentReferance, {
    onSuccess() {
      deleteHelperItem(id);
      if (!!imageUrl) {
        deleteObject(getStorage(), imageUrl)
          .then(() => console.log("Image Deleted"))
          .catch((error) => console.log(error));
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreMenu(null);
  };

  const eznEdafa = () => {
    // setItem(item);
    // setSelectedItems([]);
    // setPage(PAGES.EZN_EDAFA);
  };

  const menuItems = [
    {
      label: ARABIC_MENU.EDAFA,
      arabic: true,
      type: "Callback",
      callback: eznEdafa,
    },
    {
      label: ARABIC_MENU.SARF,
      arabic: true,
      type: "Callback",
      callback: () => console.log("SARF"),
    },
    {
      label: ARABIC_MENU.TALAB,
      arabic: true,
      type: "Callback",
      callback: () => console.log("TALAB"),
    },
    {
      label: ARABIC_MENU.KHOROOG,
      arabic: true,
      type: "Callback",
      callback: () => console.log("KHOROOG"),
    },
    {
      label: "Details",
      type: "Link",
      href: itemUrl,
    },
    {
      label: "Edit",
      type: "Link",
      href: itemUrl+ "/edit",
    },
    {
      label: "Delete",
      type: "Callback",
      callback: () => deleteMutation.mutate(),
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
            <Link
              to={itemUrl}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant={isNonMobile ? "h3" : "h4"}
                sx={{ cursor: "pointer" }}
              >
                {title}
              </Typography>
              <Typography variant={isNonMobile ? "h5" : "h6"}>
                {subTitle}
              </Typography>
            </Link>
          </Box>
          {isNonMobile && (
            <Box display="flex" flexDirection="column" textAlign="right">
              <Typography variant="h6">Quantity: {quantity || "0"}</Typography>
              <Typography variant="h6">{category}</Typography>
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
