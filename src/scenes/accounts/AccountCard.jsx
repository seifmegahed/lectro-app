import FormContainer from "../../components/FormContainer";

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

import { useState } from "react";
import { MoreVert } from "@mui/icons-material";

import useAccounts from "../../contexts/AccountsContext";

const AccountCard = ({ account }) => {
  const { updatePage, updateSelectedAccount, PAGES } =
    useAccounts();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [moreMenu, setMoreMenu] = useState(null);

  const open = Boolean(moreMenu);

  const handleMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMoreMenu(null);
  };
  const handleSelectedAccount = () => {
    updateSelectedAccount(account);
    updatePage(PAGES.ACCOUNT_PAGE);
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
            onClick={handleSelectedAccount}
            sx={{ cursor: "pointer" }}
          >
            {account.number}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography
              variant={isNonMobile ? "h3" : "h4"}
              onClick={handleSelectedAccount}
              sx={{ cursor: "pointer" }}
              // color={account.done ? "primary" : "error"}
            >
              {account.englishName}
            </Typography>
            <Typography variant={isNonMobile ? "h5" : "h6"}>
              {account.arabicName}
            </Typography>
          </Box>
          {isNonMobile && (
            <Box display="flex" flexDirection="column" textAlign="right">
              <Typography variant="h6">{account.taxNumber || ""}</Typography>
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

export default AccountCard;
