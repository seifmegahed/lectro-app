import { createContext, useReducer, useContext, useMemo } from "react";
import inventoryReducer, {
  initialState,
  ACTIONS,
} from "../reducers/inventoryReducer";

const PAGES = {
  ALL_ITEMS: "ALL_ITEMS",
  NEW_ITEM: "NEW_ITEM",
  ITEM_PAGE: "ITEM_PAGE",
  EDIT_ITEM: "EDIT_ITEM",
  EZN_EDAFA: "EZN_EDAFA",
  RECIEVE_ITEMS: "RECIEVE_ITEMS",
};

const InventoryContext = createContext(initialState);

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const value = useMemo(() => {
    const setPage = (page) => {
      dispatch({
        type: ACTIONS.SET_PAGE,
        payload: {
          page,
        },
      });
    };

    const setItem = (item) => {
      dispatch({
        type: ACTIONS.SET_ITEM,
        payload: {
          item,
        },
      });
    };

    const addItem = (item) => {
      dispatch({
        type: ACTIONS.ADD_ITEM,
        payload: {
          item,
        },
      });
    };

    const modifyItem = (item) => {
      dispatch({
        type: ACTIONS.MODIFY_ITEM,
        payload: {
          item,
        },
      });
    };

    const removeItem = (itemId) => {
      dispatch({
        type: ACTIONS.REMOVE_ITEM,
        payload: {
          itemId,
        },
      });
    };

    const setItems = (items) => {
      dispatch({
        type: ACTIONS.SET_ITEMS,
        payload: {
          items,
        },
      });
    }
    
    const setSelectedItems = (selectedItems) => {
      dispatch({
        type: ACTIONS.SET_SELECTED_ITEMS,
        payload: {
          selectedItems,
        }
      })
    }
    return {
      PAGES,
      page: state.page,
      item: state.item,
      items: state.items,
      selectedItems: state.selectedItems,
      setPage,
      setItem,
      addItem,
      setItems,
      modifyItem,
      removeItem,
      setSelectedItems,
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
