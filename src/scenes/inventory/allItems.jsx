import { useMemo, useState, useEffect } from "react";

import { db } from "../../firebase-config";
import { collection, doc, onSnapshot } from "firebase/firestore";

import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";

import {
  Box,
  Chip,
  Input,
  Button,
  useTheme,
  IconButton,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { tokens } from "../../theme";

import ItemCard from "./ItemCard";
import PopperMenu from "../../components/PopperMenu";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

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

const AllItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const updateHelper = useFirestoreDocumentMutation(helperDocumentReferance);

  const [currentItems, setCurrentItems] = useState(
    !!items ? items.map((item) => ({ ...item, selected: false })) : []
  );

  const [moreMenu, setMoreMenu] = useState(null);
  const [searchkey, setSearchkey] = useState("");
  const [page, setCurrentPage] = useState(1);
  const open = Boolean(moreMenu);

  useEffect(() => {
    const unsubscribe = onSnapshot(helperDocumentReferance, (document) => {
      const documentData = document.data();
      setItems(documentData.data);
      console.log(items.length);
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

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

  const selectedCount = useMemo(() => {
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

  const getSelected = () => {
    const temp = [];
    currentItems.forEach((item) => {
      if (item.selected) temp.push(item);
    });
    return temp;
  };

  const eznEdafa = () => {
    navigate("edafa", { state: { selectedItems: getSelected() } });
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
    setCurrentItems(items.map((item) => ({ ...item, selected: false })));
  }, [items]);

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

  if (!items.length) {
    return <Loading />;
  }

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
          onClick={() => navigate("new-item")}
        >
          New Item
        </Button>
      </Box>
      {selectedCount > 0 && (
        <Box display="flex" justifyContent="flex-start" gap="20px">
          <Chip
            id="moreMenuButton"
            aria-controls={open ? "moreMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenu}
            onDelete={clearSelected}
            label={`${selectedCount} Item${
              selectedCount === 1 ? "" : "s"
            } Selected`}
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
            getSelected={getSelected}
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
