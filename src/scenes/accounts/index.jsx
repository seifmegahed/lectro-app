import { useState, useEffect } from "react";
import useAccounts, { AccountsProvider } from "../../contexts/AccountsContext";

import { db } from "../../firebase-config";
import { getDoc, collection, doc } from "firebase/firestore";

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
  const { page, setPage, PAGES, newAccount, setAccountsLength } = useAccounts();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [accounts, setAccounts] = useState([]);

  const returnHome = () => {
    setPage(PAGES.ALL_ACCOUNTS);
  };

  const deleteAccount = (id) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  const addAccount = (newAccount) => {
    setAccounts((prev) => {
      const filtered = prev.filter((account) => account.id !== newAccount.id);
      return [...filtered, newAccount];
    });
  };

  useEffect(() => {
    if (!!newAccount.id) {
      addAccount(newAccount);
    }
  }, [newAccount]);

  useEffect(() => {
    const getData = async () => {
      const q = doc(collection(db, "helper_data"), type + "s");
      const documentSnapshot = await getDoc(q);
      const documentData = documentSnapshot.data();
      setAccountsLength(documentData.count);
      setAccounts(documentData.data);
    };
    getData();
    // eslint-disable-next-line
  }, [type]);

  const PageElements = () => {
    const { PAGES } = useAccounts();
    switch (page) {
      case PAGES.ALL_ACCOUNTS:
        return (
          <AllAccounts
            accounts={accounts}
            addAccount={addAccount}
            deleteAccount={deleteAccount}
          />
        );
      case PAGES.NEW_ACCOUNT:
        return <NewAccount type={type} />;
      case PAGES.ACCOUNT_PAGE:
        return <AccountPage />;
      case PAGES.EDIT_ACCOUNT:
        return <EditAccount />;
      default:
        return (
          <AllAccounts
            accounts={accounts}
            addAccount={addAccount}
            deleteAccount={deleteAccount}
          />
        );
    }
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
          {page !== PAGES.ALL_ACCOUNTS && (
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
