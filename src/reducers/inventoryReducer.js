export const ACTIONS = {
  SET_PAGE: "SET_PAGE",
  SET_ITEM: "SET_ITEM",
  ADD_ITEM: "ADD_ITEM",
  SET_ITEMS: "SET_ITEMS",
  REMOVE_ITEM: "REMOVE_ITEM",
  SET_SELECTED_ITEMS: "SET_SELECTED_ITEMS",
};

export const initialState = {
  page: "ALL_ITEMS",
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
    case ACTIONS.SET_ITEMS:
      console.log(ACTIONS.SET_ITEMS, payload);
      return {
        ...state,
        items: payload.items,
      };
    case ACTIONS.ADD_ITEM:
      console.log(ACTIONS.ADD_ITEM, payload);
      return {
        ...state,
        items: [
          payload.item,
          ...state.items.filter((item) => item.id !== payload.item.id),
        ],
      };
    case ACTIONS.MODIFY_ITEM:
      console.log(ACTIONS.MODIFY_ITEM);
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === payload.item.id) return payload.item;
          else return item;
        }),
      };
    case ACTIONS.REMOVE_ITEM:
      console.log(ACTIONS.REMOVE_ITEM, payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload.itemId),
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
