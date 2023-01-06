import { useEffect, useMemo, useState } from "react";

import { db } from "../../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

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
import useInventory from "../../contexts/InventoryContext";

import ItemCard from "./ItemCard";

const itemsPerPage = 10;

const AllItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { items, updatePage, PAGES } = useInventory();
  const [searchkey, setSearchkey] = useState("");
  const [page, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        items.name.toLowerCase().includes(searchkey.toLowerCase()) ||
        item.make.toLowerCase().includes(searchkey.toLowerCase()) ||
        item.category.toLowerCase().includes(searchkey.toLowerCase())
    );
  }, [searchkey, items]);

  const numberPages = useMemo(() => {
    return Math.ceil(filteredItems.length / itemsPerPage);
  }, [filteredItems]);

  const pageContent = useMemo(() => {
    const lastItemIndex = page * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return filteredItems.slice(firstItemIndex, lastItemIndex);
  }, [filteredItems]);

  return (
    <Box display="grid" gap="20px">
      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <Input
            disableUnderline
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
          sx={{ minWidth: "110px" }}
          variant="contained"
          size="large"
          onClick={() => updatePage(PAGES.NEW_ITEM)}
        >
          New Item
        </Button>
      </Box>

      {pageContent.map((item, index) => {
        return <ItemCard key={index} item={item} />;
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

export default AllItems;
