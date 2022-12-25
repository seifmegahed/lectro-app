import { db } from "../../firebase-config";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

import { Box, InputBase, IconButton, useTheme, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { tokens } from "../../theme";
import { ACTIONS, PAGES } from ".";

const AllItems = ({ dispatch, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [searchkey, setSearchkey] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(data.products)

  function handleDelete(docId) {
    async function deleteData() {
      await deleteDoc(doc(db, "items", docId));
    }
    deleteData();
    dispatch({
      type: ACTIONS.REMOVE_PRODUCT,
      payload: {
        id: docId,
      },
    });
  }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchkey(value)

  };

  useEffect(() => {
    var filtered = [];

    if (searchkey === "") {
      filtered = data.products;
    } else {
      filtered = data.products.filter(
        (product) =>
          product.data().name.toLowerCase().includes(searchkey) ||
          product.data().make.toLowerCase().includes(searchkey) ||
          product.data().category.toLowerCase().includes(searchkey)
      );
    }
    setFilteredProducts(filtered)
  }, [searchkey]);

  const handleNewItem = () => {
    dispatch({
      type: ACTIONS.UPDATE_PAGE,
      payload: {
        page: PAGES.NEW_ITEM,
      },
    });
  };

  return (
    <Box display="grid" gap="20px">
      <Box display="flex" justifyContent="space-between">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          width="250px"
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
            docId={product.id}
            handleDelete={handleDelete}
            data={product.data()}
          />
        );
      })}
    </Box>
  );
};

export default AllItems;
