import { useEffect, useState } from "react";

import SupplierCard from "./SupplierCard";
import useSuppliers from "../../../contexts/SuppliersContext";

import { tokens } from "../../../theme";

import {
  Box,
  InputBase,
  IconButton,
  useTheme,
  Button,
  Pagination,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const suppliersPerPage = 5;

const AllSuppliers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { suppliers, updatePage, PAGES } = useSuppliers();

  const [searchkey, setSearchkey] = useState("");

  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

  const [currentPage, setCurrentPage] = useState(1);
  const [numberPages, setNumberPages] = useState(1);

  // function handleDelete(docId) {
  //   async function deleteData() {
  //     await deleteDoc(doc(db, "suppliers", docId));
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
    updatePage(PAGES.NEW_SUPPLIER);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchkey]);

  useEffect(() => {
    let filtered = [];

    if (searchkey === "") {
      filtered = suppliers;
    } else {
      filtered = suppliers.filter(
        (supplier) =>
          supplier.name.includes(searchkey) ||
          supplier.englishName.toLowerCase().includes(searchkey)
      );
    }

    filtered.sort((a, b) => {
      if (a.number > b.number) return 1;
      if (a.number < b.number) return -1;
      return 0;
    });

    setNumberPages(Math.ceil(filtered.length / suppliersPerPage));
    const lastItemIndex = currentPage * suppliersPerPage;
    const firstItemIndex = lastItemIndex - suppliersPerPage;
    setFilteredSuppliers(filtered.slice(firstItemIndex, lastItemIndex));
  }, [searchkey, suppliers, currentPage]);

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
          New Supplier
        </Button>
      </Box>

      {filteredSuppliers.map((supplier) => {
        return (
          <SupplierCard
            key={`Supplier ${supplier.number}`}
            supplier={supplier}
          />
        );
      })}
      {numberPages !== 1 && (
        <Box display="flex" justifyContent="center">
          <Pagination
            count={numberPages}
            size="large"
            currentPage={currentPage}
            onChange={handlePagination}
          />
        </Box>
      )}
    </Box>
  );
};

export default AllSuppliers;
