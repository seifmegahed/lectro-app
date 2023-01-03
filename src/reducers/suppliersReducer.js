export const ACTIONS = {
  UPDATE_PAGE: "UPDATE_PAGE",
  ADD_SUPPLIER: "ADD_SUPPLIER",
  REMOVE_SUPPLIER: "REMOVE_SUPPLIER",
  UPDATE_SELECTED_SUPPLIER: "UPDATE_SELECTED_SUPPLIER",
};

export const PAGES = {
  SUPPLIERS: "SUPPLIERS",
  NEW_SUPPLIER: "NEW_SUPPLIER",
  SUPPLIER_PAGE: "SUPPLIER_PAGE",
  EDIT_SUPPLIER: "EDIT_SUPPLIER",
};

export const initialState = {
  page: PAGES.SUPPLIERS,
  suppliers: [],
  selectedSupplier: {},
};

const suppliersReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.UPDATE_PAGE:
      console.log(ACTIONS.UPDATE_PAGE, payload);
      return {
        ...state,
        page: payload.page,
      };
    case ACTIONS.ADD_SUPPLIER:
      console.log(ACTIONS.ADD_SUPPLIER, payload);
      let isNotIncluded = true;
      state.suppliers.forEach((supplier) => {
        isNotIncluded &= supplier.id !== payload.supplier.id;
      });
      if (isNotIncluded)
        return {
          ...state,
          suppliers: [...state.suppliers, payload.supplier],
        };
      else return state;
    case ACTIONS.REMOVE_SUPPLIER:
      console.log(ACTIONS.REMOVE_SUPPLIER, payload);
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (currentItem) => currentItem.id !== payload.supplierID
        ),
      };
    case ACTIONS.UPDATE_SELECTED_SUPPLIER:
      console.log(ACTIONS.UPDATE_SELECTED_SUPPLIER, payload);
      return {
        ...state,
        selectedSupplier: payload.selectedSupplier,
      };
    default:
      throw new Error(`No case for type ${type} found in suppliersReducer`);
  }
};

export default suppliersReducer;
