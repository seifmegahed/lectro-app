export const ACTIONS = {
  UPDATE_PAGE: "UPDATE_PAGE",
  UPDATE_ITEMS: "UPDATE_ITEMS",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_SELECTEDITEMS: "UPDATE_SELECTEDITEMS",
  UPDATE_SELECTEDITEM: "UPDATE_SELECTEDITEM",
};

export const PAGES = {
  STORE: "STORE",
  NEW_ITEM: "NEW_ITEM",
  ITEM_PAGE: "ITEM_PAGE",
  EDIT_ITEM: "EDIT_ITEM",
  RECIEVE_ITEMS: "RECIEVE_ITEMS",
};

export const initialState = {
  page: PAGES.STORE,
  items: [],
  selectedItems: [],
  selectedItem: {},
};

const inventoryReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.UPDATE_PAGE:
      console.log(ACTIONS.UPDATE_PAGE, payload);
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
    case ACTIONS.UPDATE_SELECTEDITEMS:
      console.log(ACTIONS.UPDATE_SELECTEDITEMS, payload);
      return {
        ...state,
        selectedItems: payload.selectedItems,
      };
    case ACTIONS.UPDATE_SELECTEDITEM:
      console.log(ACTIONS.UPDATE_SELECTEDITEM, payload);
      return {
        ...state,
        selectedItem: payload.selectedItem,
      };
    default:
      throw new Error(`No case for type ${type} found in inventoryReducer`);
  }
};

export default inventoryReducer;
