import { useEffect, useState } from "react";

import AccountCard from "./AccountCard";
import useAccounts from "../../contexts/AccountsContext";

import { tokens } from "../../theme";

import {
  Box,
  InputBase,
  IconButton,
  useTheme,
  Button,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const accountsPerPage = 10;

const AllAccounts = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const colors = tokens(theme.palette.mode);

  const { accounts, updatePage, PAGES } = useAccounts();

  const [searchkey, setSearchkey] = useState("");

  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const [page, setCurrentPage] = useState(1);
  const [numberPages, setNumberPages] = useState(1);

  // function handleDelete(docId) {
  //   async function deleteData() {
  //     await deleteDoc(doc(db, "accounts", docId));
  //   }
  //   deleteData();
  // }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchkey(value);
  };

  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };

  const handleNewItem = () => {
    updatePage(PAGES.NEW_ACCOUNT);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchkey]);

  useEffect(() => {
    let filtered = [];

    if (searchkey === "") {
      filtered = accounts;
    } else {
      filtered = accounts.filter(
        (account) =>
          account.arabicName.includes(searchkey) ||
          account.englishName.toLowerCase().includes(searchkey)
      );
    }

    setNumberPages(Math.ceil(filtered.length / accountsPerPage));
    const lastItemIndex = page * accountsPerPage;
    const firstItemIndex = lastItemIndex - accountsPerPage;
    setFilteredAccounts(filtered.slice(firstItemIndex, lastItemIndex));
  }, [searchkey, accounts, page]);

  return (
    <Box display="grid" gap="20px">
      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={searchkey || ""}
            onChange={handleSearch}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Button
          sx={{ minWidth: "130px" }}
          variant="contained"
          size="large"
          onClick={handleNewItem}
        >
          New Account
        </Button>
      </Box>

      {filteredAccounts.map((account, index) => {
        return <AccountCard key={index} account={account} />;
      })}
      {numberPages !== 1 && (
        <Box display="flex" justifyContent="center">
          <Pagination
            count={numberPages}
            size={isNonMobile ? "large" : "medium"}
            page={page}
            onChange={handlePagination}
          />
        </Box>
      )}
    </Box>
  );
};

export default AllAccounts;
