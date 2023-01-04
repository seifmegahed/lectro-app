import { createContext, useReducer, useContext, useMemo } from "react";
import inventoryReducer, {
  initialState,
  ACTIONS,
  PAGES,
} from "../reducers/inventoryReducer";

const InventoryContext = createContext(initialState);

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const value = useMemo(() => {
    const updatePage = (page) => {
      dispatch({
        type: ACTIONS.UPDATE_PAGE,
        payload: {
          page,
        },
      });
    };

    const addToItems = (item) => {
      dispatch({
        type: ACTIONS.ADD_ITEM,
        payload: {
          item,
        },
      });
    };

    const removeFromItems = (itemID) => {
      dispatch({
        type: ACTIONS.REMOVE_ITEM,
        payload: {
          itemID,
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
      let updatedSelectedItems = [];
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

    return {
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
      PAGES,
      ACTIONS,
    };
  }, [state]);

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
