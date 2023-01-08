import { useState, useMemo } from "react";

import { db } from "../../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

import {
  Box,
  Input,
  Button,
  useTheme,
  IconButton,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { tokens } from "../../theme";
import useAccounts from "../../contexts/AccountsContext";

import AccountCard from "./AccountCard";

const accountsPerPage = 10;

const AllAccounts = ({ accounts, deleteAccount }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { setPage, setAccountsLength, PAGES } = useAccounts();
  const [searchkey, setSearchkey] = useState("");
  const [page, setCurrentPage] = useState(1);

  const filteredAccounts = useMemo(() => {
    if (accounts.length > 1)
      return accounts.filter(
        (account) =>
          account.arabicName.includes(searchkey) ||
          account.englishName.toLowerCase().includes(searchkey.toLowerCase())
      );
    else return [];
  }, [searchkey, accounts]);

  const numberPages = useMemo(() => {
    return Math.ceil(filteredAccounts.length / accountsPerPage);
  }, [filteredAccounts]);

  const pageContent = useMemo(() => {
    const lastItemIndex = page * accountsPerPage;
    const firstItemIndex = lastItemIndex - accountsPerPage;
    return filteredAccounts.slice(firstItemIndex, lastItemIndex);
  }, [filteredAccounts, page]);

  function handleDelete(id) {
    async function deleteData() {
      return await deleteDoc(doc(db, "accounts", id));
    }
    deleteData();
    deleteAccount(id);
  }

  return (
    <Box display="grid" gap="20px">
      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <Input
            disableUnderline={true}
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Button
          sx={{ minWidth: "130px" }}
          variant="contained"
          size="large"
          onClick={() => {
            setAccountsLength(accounts.length);
            setPage(PAGES.NEW_ACCOUNT);
          }}
        >
          New Account
        </Button>
      </Box>

      {pageContent.map((account, index) => {
        return (
          <AccountCard
            key={index}
            account={account}
            handleDelete={handleDelete}
          />
        );
      })}
      {numberPages !== 1 && (
        <Box display="flex" justifyContent="center">
          <Pagination
            count={numberPages}
            size={isNonMobile ? "large" : "small"}
            page={page}
            onChange={(e, val) => {
              setCurrentPage(val);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AllAccounts;
