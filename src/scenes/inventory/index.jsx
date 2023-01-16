import {useEffect, useState } from "react";

import useInventory, {
  InventoryProvider,
} from "../../contexts/InventoryContext";

import { db } from "../../firebase-config";
import { doc, collection, onSnapshot } from "firebase/firestore";

import { Backdrop, Box, CircularProgress, IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import Header from "../../components/Header";
import NewItem from "./NewItem";
import AllItems from "./AllItems";
import ItemPage from "./ItemPage";
import EditItem from "./EditItem";
import Edafa from "./Edafa";

const Inventory = () => {
  return (
    <InventoryProvider>
      <InventoryWrapper />
    </InventoryProvider>
  );
};

const helperCollectionName = "helper_data";
const helperDocumentId = "Items";

const InventoryWrapper = () => {
  const { page, setPage, PAGES } = useInventory();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  const helperCollectionReferance = collection(db, helperCollectionName);
  const helperDocumentReferance = doc(
    helperCollectionReferance,
    helperDocumentId
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(helperDocumentReferance, (document) => {
      const documentData = document.data();
      setItems(documentData.data);
      setCount(documentData.count)
    });
    return () => unsubscribe();
  }, []);

  const PageElements = () => {
    switch (page) {
      case PAGES.ALL_ITEMS:
        return <AllItems items={items} />;
      case PAGES.NEW_ITEM:
        return <NewItem />;
      case PAGES.ITEM_PAGE:
        return <ItemPage />;
      case PAGES.EDIT_ITEM:
        return <EditItem />;
      case PAGES.EZN_EDAFA:
        return <Edafa />;
      default:
        console.log(`Page ${page} does not exist`);
        return <></>;
    }
  };

  // if (helperItems.isLoading) {
  //   return (
  //     <Backdrop sx={{ color: "#fff", zIndex: "100000" }} open={true}>
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  return (
    <Box display="flex" gap="10px" flexDirection="column">
      <Box display="flex" alignItems="center">
        {page !== PAGES.ALL_ITEMS && (
          <IconButton onClick={() => setPage(PAGES.ALL_ITEMS)}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        )}
        <Header title="Inventory" />
        {count}
      </Box>
      <PageElements />
    </Box>
  );
};

export default Inventory;
