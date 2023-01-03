import { useEffect } from "react";

import useSuppliers, {
  SuppliersProvider,
} from "../../../contexts/SuppliersContext";

import Header from "../../../components/Header";

import { db } from "../../../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";

import { Box, IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import AllSuppliers from "./AllSuppliers";

const Suppliers = () => {
  return (
    <SuppliersProvider>
      <SuppliersWrapper />
    </SuppliersProvider>
  );
};

const SuppliersWrapper = () => {
  const { page, addToSuppliers, removeFromSuppliers, updatePage, PAGES } =
    useSuppliers();

  const PageElements = () => {
    switch (page) {
      case PAGES.SUPPLIERS:
        return <AllSuppliers />;
      case PAGES.NEW_SUPPLIER:
        return <h1>New Supplier</h1>;
      case PAGES.SUPPLIER_PAGE:
        return <h1>Supplier Page</h1>;
      default:
        return <AllSuppliers />;
    }
  };

  useEffect(() => {
    try {
      onSnapshot(collection(db, "suppliers"), function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          switch (change.type) {
            case "removed": {
              removeFromSuppliers(change.doc.id);
              break;
            }
            case "added": {
              addToSuppliers({ ...change.doc.data(), id: change.doc.id });
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
  }, []);

  const returnHome = () => {
    updatePage(PAGES.SUPPLIERS);
  };

  return (
    <div style={{ margin: "20px", maxWidth: "700px" }}>
      <Box display="flex" gap="10px" flexDirection="column">
        <Box display="flex" alignItems="center">
          {page !== PAGES.SUPPLIERS && (
            <IconButton onClick={returnHome}>
              <ChevronLeft fontSize="large" />
            </IconButton>
          )}
          <Header title="Suppliers" />
        </Box>
        <PageElements />
      </Box>
    </div>
  );
};

export default Suppliers;
