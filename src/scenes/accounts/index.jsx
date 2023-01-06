import useAccounts, { AccountsProvider } from "../../contexts/AccountsContext";

import Header from "../../components/Header";

import { Box, IconButton, useMediaQuery } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import AllAccounts from "./AllAccounts";
import AccountPage from "./AccountPage";
import NewAccount from "./NewAccount";
import EditAccount from "./EditAccount";

const Accounts = ({ type }) => {
  return (
    <AccountsProvider>
      <AccountsWrapper type={type} />
    </AccountsProvider>
  );
};

const AccountsWrapper = ({ type }) => {
  const { page, setPage, PAGES } = useAccounts();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const PageElements = () => {
    switch (page) {
      case PAGES.ALL_ACCOUNTS:
        return <AllAccounts type={type} />;
      case PAGES.NEW_ACCOUNT:
        return <NewAccount type={type} />;
      case PAGES.ACCOUNT_PAGE:
        return <AccountPage />;
      case PAGES.EDIT_ACCOUNT:
        return <EditAccount />;
      default:
        return <AllAccounts type={type} />;
    }
  };

  const returnHome = () => {
    setPage(PAGES.ALL_ACCOUNTS);
  };

  return (
    <div
      className="main-page-container"
      style={{
        padding: `${isNonMobile ? "20px" : "10px"}`,
      }}
    >
      <Box display="flex" gap="10px" flexDirection="column">
        <Box display="flex" alignItems="center">
          {page !== PAGES.ACCOUNTS && (
            <IconButton onClick={returnHome}>
              <ChevronLeft fontSize="large" />
            </IconButton>
          )}
          <Header title={type + "s"} />
        </Box>
        <PageElements />
      </Box>
    </div>
  );
};

export default Accounts;
