import { useEffect } from "react";

import useInventory, {
  InventoryProvider,
} from "../../contexts/InventoryContext";

import NewItem from "./NewItem";
import AllItems from "./AllItems";
import ItemPage from "./ItemPage";
import EditItem from "./EditItem";
import Header from "../../components/Header";

import { db } from "../../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";

import { Box, IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const Inventory = () => {
  return (
    <InventoryProvider>
      <InventoryWrapper />
    </InventoryProvider>
  );
};

const InventoryWrapper = () => {
  const { page, addToItems, removeFromItems, modifyItem, setPage, PAGES } =
    useInventory();

  const PageElements = () => {
    switch (page) {
      case PAGES.ALL_ITEMS:
        return <AllItems />;
      case PAGES.NEW_ITEM:
        return <NewItem />;
      case PAGES.ITEM_PAGE:
        return <ItemPage />;
      case PAGES.EDIT_ITEM:
        return <EditItem />;
      default:
        return <AllItems />;
    }
  };

  useEffect(() => {
    try {
      onSnapshot(collection(db, "items"), function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          switch (change.type) {
            case "removed": {
              removeFromItems(change.doc.id);
              break;
            }
            case "added": {
              addToItems({ ...change.doc.data(), id: change.doc.id });
              break;
            }
            case "modified": {
              modifyItem({ ...change.doc.data(), id: change.doc.id });
              break;
            }
            default:
              return;
          }
        });
      });
    } catch (error) {
      console.log("There was an Error");
      console.log(error);
    }
  }, [removeFromItems, addToItems]);

  return (
    <Box display="flex" gap="10px" flexDirection="column">
      <Box display="flex" alignItems="center">
        {page !== PAGES.STORE && (
          <IconButton onClick={() => setPage(PAGES.ALL_ITEMS)}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        )}
        <Header title="Inventory" />
      </Box>
      <PageElements />
    </Box>
  );
};

export default Inventory;
