import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useAccounts from "../../contexts/AccountsContext";

import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import FormContainer from "../../components/FormContainer";
import PopperMenu from "../../components/PopperMenu";

const AccountCard = ({ account, handleDelete }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { setPage, setAccount, PAGES } = useAccounts();
  const [moreMenu, setMoreMenu] = useState(null);
  const { admin } = useAuth();

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

  const visitAccount = () => {
    setAccount(account);
    setPage(PAGES.ACCOUNT_PAGE);
  };

  const handleEditAccount = () => {
    setAccount(account);
    setPage(PAGES.EDIT_ACCOUNT);
  };

  const menuItems = [
    {
      label: "Details",
      callback: visitAccount,
    },
    {
      label: "Edit",
      callback: handleEditAccount,
    },
    {
      label: "Delete",
      callback: () => handleDelete(id),
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
        height="60px"
        sx={{ gridColumn: "span 4" }}
      >
        <Box width="60px" display="flex" justifyContent="center">
          <Typography
            variant={isNonMobile ? "h1" : "h2"}
            onClick={visitAccount}
            sx={{ cursor: "pointer" }}
          >
            {number}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography
              variant={isNonMobile ? "h3" : "h4"}
              onClick={visitAccount}
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

export default AccountCard;
