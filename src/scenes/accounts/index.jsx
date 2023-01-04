import { useEffect } from "react";

import useAccounts, { AccountsProvider } from "../../contexts/AccountsContext";

import Header from "../../components/Header";

import { db } from "../../firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { Box, IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import AllAccounts from "./AllAccounts";
import AccountPage from "./AccountPage";

const Accounts = ({ type }) => {
  return (
    <AccountsProvider>
      <AccountsWrapper passedType={type} />
    </AccountsProvider>
  );
};

const AccountsWrapper = ({ passedType }) => {
  const {
    page,
    updatePage,
    addToAccounts,
    removeFromAccounts,
    PAGES,
  } = useAccounts();

  const PageElements = () => {
    switch (page) {
      case PAGES.ACCOUNTS:
        return <AllAccounts />;
      case PAGES.NEW_ACCOUNT:
        return <h1>New Accounts</h1>;
      case PAGES.ACCOUNT_PAGE:
        return <AccountPage />;
      default:
        return <AllAccounts />;
    }
  };

  useEffect(() => {
    try {
      const accountsQuery = query(
        collection(db, "accounts"),
        where("type", "==", passedType)
      );
      
      onSnapshot(accountsQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          switch (change.type) {
            case "removed": {
              removeFromAccounts(change.doc.id);
              break;
            }
            case "added": {
              addToAccounts({ ...change.doc.data(), id: change.doc.id });
              break;
            }
            default:
              return;
          }
        });
      });
    } catch (error) {
      console.log("There was an Error");
      console.log(error);
    }
  }, [addToAccounts, removeFromAccounts, passedType]);

  const returnHome = () => {
    updatePage(PAGES.ACCOUNTS);
  };

  return (
    <div style={{ margin: "20px", maxWidth: "700px" }}>
      <Box display="flex" gap="10px" flexDirection="column">
        <Box display="flex" alignItems="center">
          {page !== PAGES.ACCOUNTS && (
            <IconButton onClick={returnHome}>
              <ChevronLeft fontSize="large" />
            </IconButton>
          )}
          <Header title={passedType + "s"} />
        </Box>
        <PageElements />
      </Box>
    </div>
  );
};

export default Accounts;
