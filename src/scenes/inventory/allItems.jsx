import { useMemo, useState, useEffect } from "react";

import { db } from "../../firebase-config";
import { collection, doc } from "firebase/firestore";

import {
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";

import {
  Box,
  Input,
  Button,
  useTheme,
  IconButton,
  Pagination,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { tokens } from "../../theme";
import useInventory from "../../contexts/InventoryContext";

import ItemCard from "./ItemCard";
import PopperMenu from "../../components/PopperMenu";

export const ARABIC_MENU = {
  EDAFA: "إضافه",
  SARF: "صرف",
  KHOROOG: "خروج",
  TALAB: "طلب شراء",
};

const helperCollectionName = "helper_data";
const helperDocumentId = "Items";

const helperCollectionReferance = collection(db, helperCollectionName);
const helperDocumentReferance = doc(
  helperCollectionReferance,
  helperDocumentId
);

const itemsPerPage = 10;

const AllItems = ({ items }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const updateHelper = useFirestoreDocumentMutation(helperDocumentReferance);

  const { setPage, selectedItems, setSelectedItems, PAGES } = useInventory();

  const [currentItems, setCurrentItems] = useState(
    !!items ? items.map((item) => ({ ...item, selected: false })) : []
  );

  const [moreMenu, setMoreMenu] = useState(null);
  const [searchkey, setSearchkey] = useState("");
  const [page, setCurrentPage] = useState(1);
  const open = Boolean(moreMenu);

  const filteredItems = useMemo(
    () =>
      currentItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchkey.toLowerCase()) ||
          item.make.toLowerCase().includes(searchkey.toLowerCase()) ||
          (!!item.mpn
            ? item.mpn.toLowerCase().includes(searchkey.toLowerCase())
            : false) ||
          item.category.toLowerCase().includes(searchkey.toLowerCase())
      ),
    [searchkey, currentItems]
  );

  let numberPages = useMemo(() => {
    return Math.ceil(filteredItems.length / itemsPerPage);
  }, [filteredItems]);

  const pageContent = useMemo(() => {
    const lastItemIndex = page * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return filteredItems.slice(firstItemIndex, lastItemIndex);
  }, [filteredItems, page]);

  const selected = useMemo(() => {
    let temp = 0;
    currentItems.forEach((item) => {
      if (item.selected) temp++;
    });
    return temp;
  }, [currentItems]);

  const toggleSelected = (itemId) => {
    setCurrentItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, selected: !item.selected };
        }
        return item;
      })
    );
  };

  const updateSelected = () => {
    const temp = [];
    currentItems.forEach((item) => {
      if (item.selected) temp.push(item);
    });
    setSelectedItems(temp);
  };

  const eznEdafa = () => {
    updateSelected();
    setPage(PAGES.EZN_EDAFA);
  };

  const clearSelected = () => {
    setCurrentItems((prev) =>
      prev.map((item) => ({ ...item, selected: false }))
    );
  };

  const handleMenu = (event) => {
    setMoreMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreMenu(null);
  };

  const deleteHelperItem = (id) => {
    const data = items.filter((item) => item.id !== id);
    const count = data.length;
    updateHelper.mutate({ data, count });
  };

  useEffect(() => {
    selectedItems.forEach((item) => {
      setCurrentItems((prev) =>
        prev.map((stateItem) => {
          if (item.id === stateItem.id)
            return { ...item, selected: true };
          else return stateItem;
        })
      );
    });
  }, [selectedItems]);

  const menuItems = [
    {
      label: ARABIC_MENU.EDAFA,
      arabic: true,
      callback: eznEdafa,
    },
    {
      label: ARABIC_MENU.SARF,
      arabic: true,
      callback: () => console.log("SARF"),
    },
    {
      label: ARABIC_MENU.KHOROOG,
      arabic: true,
      callback: () => console.log("KHOROOG"),
    },
    {
      label: ARABIC_MENU.TALAB,
      arabic: true,
      callback: () => console.log("TALAB"),
    },
  ];

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
            <Search />
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
      {selected > 0 && (
        <Box display="flex" justifyContent="flex-start" gap="20px">
          <Chip
            id="moreMenuButton"
            aria-controls={open ? "moreMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenu}
            onDelete={clearSelected}
            label={`${selected} Item${selected === 1 ? "" : "s"} Selected`}
          />
          <PopperMenu
            handleClose={handleMenuClose}
            element={moreMenu}
            menuItems={menuItems}
          />
        </Box>
      )}

      {pageContent.map((item, index) => {
        return (
          <ItemCard
            key={index}
            item={item}
            toggleSelected={toggleSelected}
            updateSelected={updateSelected}
            deleteHelperItem={deleteHelperItem}
          />
        );
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
