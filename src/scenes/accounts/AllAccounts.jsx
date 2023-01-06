import { useState, useMemo } from "react";

import AccountCard from "./AccountCard";
import useAccounts from "../../contexts/AccountsContext";
import { tokens } from "../../theme";

import {
  Box,
  IconButton,
  useTheme,
  Button,
  Pagination,
  useMediaQuery,
  Input,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const accountsPerPage = 10;

const AllAccounts = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const colors = tokens(theme.palette.mode);

  const { accounts, setPage, PAGES } = useAccounts();
  const [searchkey, setSearchkey] = useState("");
  const [page, setCurrentPage] = useState(1);
  

  const handleNewItem = () => {
    setPage(PAGES.NEW_ACCOUNT);
  };

  const filteredAccounts = useMemo(() => {
    setCurrentPage(1);
    return accounts.filter(
      (account) =>
        account.arabicName.includes(searchkey) ||
        account.englishName.toLowerCase().includes(searchkey.toLowerCase())
    );
  }, [searchkey, accounts]);

  const numberPages = useMemo(() => {
    return Math.ceil(filteredAccounts.length / accountsPerPage);
  }, [filteredAccounts]);

  const pageContent = useMemo(() => {
    const lastItemIndex = page * accountsPerPage;
    const firstItemIndex = lastItemIndex - accountsPerPage;
    return filteredAccounts.slice(firstItemIndex, lastItemIndex);
  }, [filteredAccounts, page]);

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
            onChange={e => setSearchkey(e.target.value)}
            
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

      {pageContent.map((account, index) => {
        return <AccountCard key={index} account={account} />;
      })}
      {numberPages !== 1 && (
        <Box display="flex" justifyContent="center">
          <Pagination
            count={numberPages}
            size={isNonMobile ? "large" : "small"}
            page={page}
            onChange={(e, val) => setCurrentPage(val)}
          />
        </Box>
      )}
    </Box>
  );
};

export default AllAccounts;
