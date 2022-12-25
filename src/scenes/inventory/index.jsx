import Header from "../../components/Header";
import { Box } from "@mui/material";
import { useReducer } from "react";
import NewItem from "./NewItem";
import AllItems from "./allItems";

export const ACTIONS = {
  UPDATE_PAGE: "update-page",
  UPDATE_PRODUCT: "update-product",
};
export const PAGES = {
  ALL_ITEMS: "allItems",
  NEW_ITEM: "newItem",
  ITEM: "item",
  EDIT_ITEM: "editItem",
  RECIEVE_ITEMS: "recieveItems",
};

function reducer(items, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_PAGE:
      return { ...items, page: action.payload.page };
    case ACTIONS.UPDATE_PRODUCT:
      return { ...items, product: action.payload.product };
  }
}

const Items = () => {
  function PageElements({page}) {
    switch (page) {
      case PAGES.ALL_ITEMS:
        return <AllItems dispatch={dispatch} />;
      case PAGES.NEW_ITEM:
        return <NewItem dispatch={dispatch} />;
    }
  }
  const [items, dispatch] = useReducer(reducer, { page: PAGES.ALL_ITEMS });

  return (
    <Box m="20px" maxWidth="700px">
      <Box display="flex" gap="10px" flexDirection="column">
        <Header title="Items in Store" subtitle="" />
        <PageElements page={items.page}/>
      </Box>
    </Box>
  );
};

export default Items;
