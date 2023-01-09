import { useEffect } from "react";

import useInventory, {
  InventoryProvider,
} from "../../contexts/InventoryContext";

import { db } from "../../firebase-config";
import { collection, orderBy, query } from "firebase/firestore";

import { Backdrop, Box, CircularProgress, IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import Header from "../../components/Header";
import NewItem from "./NewItem";
import AllItems from "./AllItems";
import ItemPage from "./ItemPage";
import EditItem from "./EditItem";
import Edafa from "./Edafa";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const Inventory = () => {
  return (
    <InventoryProvider>
      <InventoryWrapper />
    </InventoryProvider>
  );
};

const InventoryWrapper = () => {
  const { page, setPage, setItems, PAGES } = useInventory();

  const itemsCollection = query(
    collection(db, "items"),
    orderBy("createdOn", "desc")
  );

  const items = useFirestoreQueryData(["items"], itemsCollection, {
    idField: "id",
  });

  useEffect(() => {
    if (items.isSuccess) {
      const current = Number(localStorage.getItem("numberOfReads")) + 1;
      console.log(`Number of Reads: ${current}`);
      localStorage.setItem("numberOfReads", current);
      setItems(items.data);
    }
    // eslint-disable-next-line
  }, [items.isSuccess]);

  const PageElements = () => {
    switch (page) {
      case PAGES.ALL_ITEMS:
        if (items.isLoading)
          return (
            <Backdrop sx={{ color: "#fff", zIndex: "100000" }} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          );
        return <AllItems />;
      case PAGES.NEW_ITEM:
        return <NewItem />;
      case PAGES.ITEM_PAGE:
        return <ItemPage />;
      case PAGES.EDIT_ITEM:
        return <EditItem />;
      case PAGES.EZN_EDAFA:
        return <Edafa />;
      default:
        return <AllItems />;
    }
  };

  return (
    <Box display="flex" gap="10px" flexDirection="column">
      <Box display="flex" alignItems="center">
        {page !== PAGES.ALL_ITEMS && (
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
