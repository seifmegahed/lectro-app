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
    const setPage = (page) => {
      dispatch({
        type: ACTIONS.SET_PAGE,
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

    const setItem = (item) => {
      dispatch({
        type: ACTIONS.SET_ITEM,
        payload: {
          item,
        },
      });
    };

    const modifyItem = (item) => {
      dispatch({
        type: ACTIONS.REMOVE_ITEM,
        payload: {
          id: item.id,
        },
      });
      dispatch({
        type: ACTIONS.ADD_ITEM,
        payload: {
          item,
        },
      });
      if (item.id === state.item.id)
        dispatch({
          type: ACTIONS.SET_ITEM,
          payload: {
            item,
          },
        });
    };

    return {
      PAGES,
      page: state.page,
      item: state.item,
      items: state.items,
      selectedItems: state.selectedItems,
      setPage,
      setItem,
      addToItems,
      modifyItem,
      removeFromItems,
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
