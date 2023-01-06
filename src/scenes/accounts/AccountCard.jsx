import { useState } from "react";
import useAccounts from "../../contexts/AccountsContext";

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
  useMediaQuery,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import FormContainer from "../../components/FormContainer";

const AccountCard = ({ account }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { setPage, setAccount, PAGES } = useAccounts();
  const [moreMenu, setMoreMenu] = useState(null);
  const { id, number, taxNumber } = account;
  const maxStringSize = 15;
  const maxSubStringSize = 25;

  const englishName = isNonMobile
    ? account.englishName
    : account.englishName.length > maxStringSize
    ? account.englishName.substring(0, maxStringSize).trimEnd() + "..."
    : account.englishName;
  const arabicName = isNonMobile
    ? account.arabicName
    : account.arabicName.length > maxSubStringSize
    ? "..." + account.arabicName.substring(0, maxSubStringSize).trimEnd()
    : account.arabicName;

  const open = Boolean(moreMenu);

  const handleMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreMenu(null);
  };

  const handleSelectAccount = () => {
    setAccount(account);
    setPage(PAGES.ACCOUNT_PAGE);
  };

  const handleEditAccount = () => {
    setAccount(account);
    setPage(PAGES.EDIT_ACCOUNT);
  };

  function handleDelete() {
    async function deleteData() {
      await deleteDoc(doc(db, "accounts", id));
    }
    deleteData();
  }

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
            onClick={handleSelectAccount}
            sx={{ cursor: "pointer" }}
          >
            {number}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography
              variant={isNonMobile ? "h3" : "h4"}
              onClick={handleSelectAccount}
              sx={{ cursor: "pointer" }}  
              // color={done ? "primary" : "error"}
            >
              {englishName}
            </Typography>
            <Typography variant={isNonMobile ? "h5" : "h6"}>
              {arabicName}
            </Typography>
          </Box>
          {isNonMobile && (
            <Box display="flex" flexDirection="column" textAlign="right">
              <Typography variant="h6">{taxNumber || ""}</Typography>
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
                    handleEditAccount();
                    handleMenuClose();
                  }}
                >
                  Edit
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

export default AccountCard;
