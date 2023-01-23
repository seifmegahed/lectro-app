import { useMemo, useState } from "react";

import { Box, Pagination } from "@mui/material";

import EdafaCard from "./EdafaCard";

const itemsPerPage = 10;

const AllEdafa = ({ data, searchkey }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const edafaItems = useMemo(
    () =>
      data.flatMap((ezn) =>
        ezn.items.map((item) => ({
          mpn: item.mpn,
          name: item.name,
          make: item.make,
          category: item.category,
          quantity: item.quantity,
          edafaDate: ezn.edafaDate,
          edafaNumber: ezn.edafaNumber,
          supplierArabicName: ezn.supplier.arabicName,
          supplierEnglishName: ezn.supplier.englishName,
        }))
      ),
    [data]
  );

  const filteredEdafaItems = useMemo(
    () =>
      edafaItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchkey.toLowerCase()) ||
          item.make.toLowerCase().includes(searchkey.toLowerCase()) ||
          item.category.toLowerCase().includes(searchkey.toLowerCase()) ||
          item.mpn.toLowerCase().includes(searchkey.toLowerCase()) ||
          item.supplierEnglishName
            .toLowerCase()
            .includes(searchkey.toLowerCase()) ||
          item.supplierArabicName.includes(searchkey) ||
          item.edafaNumber === searchkey ||
          item.quantity === searchkey
      ),
    [searchkey, edafaItems]
  );

  const numberPages = useMemo(() => {
    return Math.ceil(filteredEdafaItems.length / itemsPerPage);
  }, [filteredEdafaItems]);

  const pageContent = useMemo(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return filteredEdafaItems.slice(firstItemIndex, lastItemIndex);
  }, [filteredEdafaItems, currentPage]);

  return (
    <>
      {pageContent.map((edafaItem, index) => (
        <EdafaCard key={index} item={edafaItem} />
      ))}
      {numberPages > 1 && (
        <Box display="flex" justifyContent="center">
          <Pagination
            count={numberPages}
            page={currentPage}
            onChange={(e, val) => setCurrentPage(val)}
          />
        </Box>
      )}
    </>
  );
};

export default AllEdafa;
