import Header from "../../components/Header";
import { Box } from "@mui/material";
import { useReducer, useEffect } from "react";
import NewItem from "./NewItem";
import AllItems from "./allItems";

import { db } from "../../firebase-config";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

export const ACTIONS = {
  UPDATE_PAGE: "update-page",
  UPDATE_SELECTED_PRODUCT: "update-product",
  ADD_PRODUCTS: "add-products",
};

export const PAGES = {
  ALL_ITEMS: "allItems",
  NEW_ITEM: "newItem",
  ITEM: "item",
  EDIT_ITEM: "editItem",
  RECIEVE_ITEMS: "recieveItems",
  REMOVE_PRODUCT: "removeProduct",
};

function reducer(items, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_PAGE:
      return { ...items, page: action.payload.page };
    case ACTIONS.UPDATE_SELECTED_PRODUCT:
      return { ...items, selectedProduct: action.payload.product };
    case ACTIONS.ADD_PRODUCTS:
      return {
        ...items,
        products: action.payload.products,
        filtered: action.payload.products,
      };
    case ACTIONS.REMOVE_PRODUCT:
      return {
        ...items,
        products: items.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    default:
      return items;
  }
}

const Inventory = () => {
  const [items, dispatch] = useReducer(reducer, {
    page: PAGES.ALL_ITEMS,
    products: [],
  });

  function PageElements({ page }) {
    switch (page) {
      case PAGES.ALL_ITEMS:
        return <AllItems dispatch={dispatch} data={items} />;
      case PAGES.NEW_ITEM:
        return <NewItem dispatch={dispatch} />;
    }
  }

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await getDocs(query(collection(db, "items")));
        dispatch({
          type: ACTIONS.ADD_PRODUCTS,
          payload: {
            products: products.docs,
          },
        });
      } catch (error) {
        console.log("There was an Error");
        console.log(error);
      }
    }
    getProducts();
  }, []);

  const returnHome = () => {
    dispatch({ type: ACTIONS.UPDATE_PAGE, payload: { page: PAGES.ALL_ITEMS } });
  };

  return (
    <Box m="20px" maxWidth="700px">
      <Box display="flex" gap="10px" flexDirection="column">
        <Box sx={{ cursor: "pointer" }} onClick={returnHome}>
          <Header title="Inventory" />
        </Box>
        <PageElements page={items.page} />
      </Box>
    </Box>
  );
};

export default Inventory;
