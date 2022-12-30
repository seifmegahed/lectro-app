import { useEffect } from "react";

import useInventory, {
  InventoryProvider,
} from "../../contexts/InventoryContext";

import { PAGES } from "../../reducers/inventoryReducer";

import NewItem from "./NewItem";
import AllItems from "./allItems";
import ItemPage from "./ItemPage";
import Header from "../../components/Header";

import { db } from "../../firebase-config";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";

import { Box } from "@mui/material";

const Inventory = () => {
  return (
    <InventoryProvider>
      <InventoryWrapper />
    </InventoryProvider>
  );
};

const InventoryWrapper = () => {
  const { page, addToItems, removeFromItems, updatePage } = useInventory();

  const PageElements = () => {
    switch (page) {
      case PAGES.STORE:
        return <AllItems />;
      // case PAGES.NEW_ITEM:
      //   return <NewItem />;
      // case PAGES.ITEM_PAGE:
      //   return <ItemPage />;
      default:
        return <AllItems />;
    }
  };

  useEffect(() => {
    async function subscribeToItems() {
      try {
        // const products = await getDocs(query(collection(db, "items")));
        onSnapshot(collection(db, "items"), await function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            switch (change.type) {
              case "removed": {
                removeFromItems(change.doc);
                break;
              }
              case "added": {
                addToItems(change.doc);
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
    }
    subscribeToItems();
  }, []);

  const returnHome = () => {
    updatePage(PAGES.STORE);
  };

  return (
    <Box m="20px" maxWidth="700px">
      <Box display="flex" gap="10px" flexDirection="column">
        <Box sx={{ cursor: "pointer" }} onClick={returnHome}>
          <Header title="Inventory" />
        </Box>
        <PageElements />
      </Box>
    </Box>
  );
};

export default Inventory;
