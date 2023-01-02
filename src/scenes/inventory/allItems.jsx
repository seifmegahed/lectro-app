import { db } from "../../firebase-config";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

import {
  Box,
  InputBase,
  IconButton,
  useTheme,
  Button,
  Pagination,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { tokens } from "../../theme";
import { PAGES } from "../../reducers/inventoryReducer";
import useInventory from "../../contexts/InventoryContext";

const AllItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { items, updatePage } = useInventory();
  const [searchkey, setSearchkey] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(items);
  const [page, setPage] = useState(1);

  function handleDelete(docId) {
    async function deleteData() {
      await deleteDoc(doc(db, "items", docId));
    }
    deleteData();
  }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchkey(value);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const handleNewItem = () => {
    updatePage(PAGES.NEW_ITEM);
  };

  useEffect(() => {
    var filtered = [];
    if (searchkey === "") {
      filtered = items;
    } else {
      filtered = items.filter(
        (product) =>
          product.name.toLowerCase().includes(searchkey) ||
          product.make.toLowerCase().includes(searchkey) ||
          product.category.toLowerCase().includes(searchkey)
      );
    }
    setFilteredProducts(filtered);
  }, [searchkey, items]);

  return (
    <Box display="grid" gap="20px">
      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"     
          maxWidth="250px"
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
        <Button variant="contained" size="large" onClick={handleNewItem}>
          New Item
        </Button>
      </Box>

      {filteredProducts.map((product) => {
        return (
          <ItemCard
            key={product.id}
            product={product}
            handleDelete={() => handleDelete(product.id)}
          />
        );
      })}
      <Box display="flex" justifyContent="center">
        <Pagination
          count={5}
          size="large"
          page={page}
          onChange={handlePagination}
        />
      </Box>
    </Box>
  );
};

export default AllItems;
