import { useMemo, useState, useEffect } from "react";

import { db } from "../../firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

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

  const { setPage, PAGES } = useInventory();
  const [items, setItems] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [page, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchkey.toLowerCase()) ||
        item.make.toLowerCase().includes(searchkey.toLowerCase()) ||
        item.category.toLowerCase().includes(searchkey.toLowerCase())
    );
  }, [searchkey, items]);

  let numberPages = useMemo(() => {
    return Math.ceil(filteredItems.length / itemsPerPage);
  }, [filteredItems]);

  const pageContent = useMemo(() => {
    const lastItemIndex = page * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return filteredItems.slice(firstItemIndex, lastItemIndex);
  }, [filteredItems, page]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "items"), orderBy("createdOn", "desc")),
        function (snapshot) {
          let newItems = [];
          snapshot.docs.forEach((doc) =>
            newItems.push({ ...doc.data(), id: doc.id })
          );
          setItems(newItems);
        }
      ),
    []
  );

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
          onClick={() => setPage(PAGES.NEW_ITEM)}
        >
          New Item
        </Button>
      </Box>

      {pageContent.map((item, index) => {
        return <ItemCard key={index} item={item} />;
      })}
      {numberPages >= 1 && (
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
