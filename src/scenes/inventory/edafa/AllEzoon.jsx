import { useMemo, useState } from "react";

import { Box, Pagination } from "@mui/material";

import EznCard from "./EznCard";

const itemsPerPage = 5;

const AllEzoon = ({ data, searchkey }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEdafaItems = useMemo(
    () =>
      data.filter(
        (edafa) =>
          edafa.supplier.englishName
            .toLowerCase()
            .includes(searchkey.toLowerCase()) ||
          edafa.supplier.englishName
            .toLowerCase()
            .includes(searchkey.toLowerCase()) ||
          edafa.supplier.arabicName.includes(searchkey) ||
          edafa.edafaNumber === searchkey
      ),
    [searchkey, data]
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
      {pageContent.map((edafa, index) => (
        <EznCard key={index} edafaItem={edafa} />
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

export default AllEzoon;
