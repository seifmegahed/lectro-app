import { createContext, useReducer, useContext } from "react";
import inventoryReducer, {
  initialState,
  ACTIONS,
} from "../reducers/inventoryReducer";

const InventoryContext = createContext(initialState);

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const updatePage = (page) => {
    dispatch({
      type: ACTIONS.UPDATE_PAGE,
      payload: {
        page,
      },
    });
  };

  const addToItems = (item) => {
    console.log("addToItems", item.id);
    let updatedItems = [];
    let isNotIncluded = true;
    state.items.forEach((currentItem) => {
      isNotIncluded &= currentItem.id !== item.id;
    });
    updatedItems = state.items;
    if (isNotIncluded) {
      updatedItems.push(item);
      dispatch({
        type: ACTIONS.UPDATE_ITEMS,
        payload: {
          items: updatedItems,
        },
      });
    }
  };

  const removeFromItems = (itemID) => {
    dispatch({
      type: ACTIONS.REMOVE_ITEM,
      payload: {
        itemID
      },
    });
  };

  const addToSelectedItems = (item) => {
    let updatedSelectedItems = [];
    let isNotIncluded = true;
    state.selectedItems.forEach((currentItem) => {
      isNotIncluded &= currentItem.id !== item.id;
    });
    updatedSelectedItems = state.items;
    if (isNotIncluded) {
      updatedSelectedItems.push(item);
      dispatch({
        type: ACTIONS.UPDATE_SELECTEDITEMS,
        payload: {
          selectedItems: updatedSelectedItems,
        },
      });
    }
  };

  const removeFromSelectedItems = (item) => {
    const updatedSelectedItems = [];
    updatedSelectedItems = state.selectedItems.filter(
      (currentItem) => currentItem.id !== item.id
    );
    dispatch({
      type: ACTIONS.UPDATE_SELECTEDITEMS,
      payload: {
        selectedItems: updatedSelectedItems,
      },
    });
  };

  const updateSelectedItem = (selectedItem) => {
    dispatch({
      type: ACTIONS.UPDATE_SELECTEDITEM,
      payload: {
        selectedItem,
      },
    });
  };

  const value = {
    page: state.page,
    items: state.items,
    selectedItems: state.selectedItems,
    selectedItem: state.selectedItem,
    updatePage,
    addToItems,
    removeFromItems,
    addToSelectedItems,
    removeFromSelectedItems,
    updateSelectedItem,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory should be used within InventoryContext");
  }
  return context;
};

export default useInventory;