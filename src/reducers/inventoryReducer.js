export const ACTIONS = {
  SET_PAGE: "SET_PAGE",
  SET_ITEM: "SET_ITEM",
  SET_SELECTED_ITEMS: "SET_SELECTED_ITEMS",
};

export const PAGES = {
  ALL_ITEMS: "ALL_ITEMS",
  NEW_ITEM: "NEW_ITEM",
  ITEM_PAGE: "ITEM_PAGE",
  EDIT_ITEM: "EDIT_ITEM",
  RECIEVE_ITEMS: "RECIEVE_ITEMS",
};

export const initialState = {
  page: PAGES.ALL_ITEMS,
  items: [],
  item: {},
  selectedItems: [],
};

const inventoryReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_PAGE:
      console.log(ACTIONS.SET_PAGE, payload);
      return {
        ...state,
        page: payload.page,
      };
    case ACTIONS.SET_ITEM:
      console.log(ACTIONS.SET_ITEM, payload);
      return {
        ...state,
        item: payload.item,
      };
    case ACTIONS.SET_SELECTED_ITEMS:
      console.log(ACTIONS.SET_SELECTED_ITEMS, payload);
      return {
        ...state,
        selectedItems: payload.selectedItems,
      };
    default:
      throw new Error(`No case for type ${type} found in inventoryReducer`);
  }
};

export default inventoryReducer;
