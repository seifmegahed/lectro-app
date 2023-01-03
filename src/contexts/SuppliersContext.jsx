import { createContext, useReducer, useContext, useMemo } from "react";
import suppliersReducer, {
  initialState,
  ACTIONS,
  PAGES,
} from "../reducers/suppliersReducer";

const SuppliersContext = createContext(initialState);

export const SuppliersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(suppliersReducer, initialState);

  const updatePage = (page) => {
    dispatch({
      type: ACTIONS.UPDATE_PAGE,
      payload: {
        page,
      },
    });
  };

  const addToSuppliers = (supplier) => {
    dispatch({
      type: ACTIONS.ADD_SUPPLIER,
      payload: {
        supplier,
      },
    });
  };

  const removeFromSuppliers = (supplierID) => {
    dispatch({
      type: ACTIONS.REMOVE_SUPPLIER,
      payload: {
        supplierID,
      },
    });
  };

  const updateSelectedSupplier = (selectedSupplier) => {
    dispatch({
      type: ACTIONS.UPDATE_SELECTED_SUPPLIER,
      payload: {
        selectedSupplier,
      },
    });
  };

  const value = useMemo(
    () => ({
      page: state.page,
      suppliers: state.suppliers,
      selectedSupplier: state.selectedSupplier,
      updatePage,
      addToSuppliers,
      removeFromSuppliers,
      updateSelectedSupplier,
      PAGES,
      ACTIONS,
    }),
    [state]
  );

  return (
    <SuppliersContext.Provider value={value}>
      {children}
    </SuppliersContext.Provider>
  );
};

const useSuppliers = () => {
  const context = useContext(SuppliersContext);
  if (context === undefined) {
    throw new Error("useSuppliers should be used within SuppliersContext");
  }
  return context;
};

export default useSuppliers;
