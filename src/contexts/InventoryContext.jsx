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

    const setItem = (item) => {
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
      selectedItems: state.selectedItems,
      setPage,
      setItem,
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
