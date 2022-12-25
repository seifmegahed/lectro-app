import { db } from "../../firebase-config";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

import { Box, InputBase, IconButton, useTheme, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { tokens } from "../../theme";
import { ACTIONS, PAGES } from ".";

const AllItems = ({ dispatch }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  function handleDelete(docId) {
    async function deleteData() {
      await deleteDoc(doc(db, "items", docId));
    }
    deleteData();
    const newItems = items.filter((item) => item.id !== docId);
    setItems(newItems);
  }

  useEffect(() => {
    async function getData() {
      const data = await getDocs(query(collection(db, "items")));
      setItems(data.docs);
      setFilteredItems(data.docs);
    }
    getData();
  }, []);

  useEffect(() => {
    if (searchKey === "") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter(
          (item) =>
            item.data().name.toLowerCase().includes(searchKey) ||
            item.data().make.toLowerCase().includes(searchKey) ||
            item.data().category.toLowerCase().includes(searchKey)
        )
      );
    }
  }, [searchKey, items]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchKey(value);
  };
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
            value={searchKey}
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

      {filteredItems.map((item) => {
        return (
          <ItemCard
            key={item.id}
            docId={item.id}
            handleDelete={handleDelete}
            data={item.data()}
          />
        );
      })}
    </Box>
  );
};

export default AllItems;
