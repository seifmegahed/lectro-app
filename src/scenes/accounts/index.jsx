import { useEffect } from "react";
import useAccounts, { AccountsProvider } from "../../contexts/AccountsContext";

import Header from "../../components/Header";

import { db } from "../../firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { Box, IconButton, useMediaQuery } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import AllAccounts from "./AllAccounts";
import AccountPage from "./AccountPage";
import NewAccount from "./NewAccount";
import EditAccount from "./EditAccount";
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
    setPage,
    addToAccounts,
    setAccount,
    removeFromAccounts,
    PAGES,
  } = useAccounts();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const PageElements = () => {
    switch (page) {
      case PAGES.ACCOUNTS:
        return <AllAccounts />;
      case PAGES.NEW_ACCOUNT:
        return <NewAccount type={passedType} />;
      case PAGES.ACCOUNT_PAGE:
        return <AccountPage />;
      case PAGES.EDIT_ACCOUNT:
        return <EditAccount />;
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
            case "modified": {
              removeFromAccounts(change.doc.id);
              addToAccounts({ ...change.doc.data(), id: change.doc.id });
              setAccount({ ...change.doc.data(), id: change.doc.id });
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
  }, [addToAccounts, removeFromAccounts, setAccount, passedType]);

  const returnHome = () => {
    setPage(PAGES.ACCOUNTS);
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
          <Header title={passedType + "s"} />
        </Box>
        <PageElements />
      </Box>
    </div>
  );
};

export default Accounts;
