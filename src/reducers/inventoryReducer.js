export const ACTIONS = {
  SET_PAGE: "SET_PAGE",
  ADD_ITEM: "ADD_ITEM",
  SET_ITEM: "SET_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_SELECTEDITEMS: "UPDATE_SELECTEDITEMS",
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
    case ACTIONS.UPDATE_ITEMS:
      console.log(ACTIONS.UPDATE_ITEMS, payload);
      return {
        ...state,
        items: payload.items,
      };
    case ACTIONS.ADD_ITEM:
      let isNotIncluded = true;
      state.items.forEach((item) => {
        isNotIncluded &= item.id !== payload.item.id;
      });
      if (isNotIncluded)
        return {
          ...state,
          items: [...state.items, payload.item],
        };
      else return state;
    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          (currentItem) => currentItem.id !== payload.itemID
        ),
      };
    case ACTIONS.SET_ITEM:
      console.log(ACTIONS.SET_ITEM, payload);
      return {
        ...state,
        item: payload.item,
      };
    default:
      throw new Error(`No case for type ${type} found in inventoryReducer`);
  }
};

export default inventoryReducer;
