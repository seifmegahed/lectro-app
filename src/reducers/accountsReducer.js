export const ACTIONS = {
  SET_TYPE: "SET_TYPE",
  SET_PAGE: "SET_PAGE",
  ADD_ACCOUNT: "ADD_ACCOUNT",
  SET_ACCOUNT: "SET_ACCOUNT",
  REMOVE_ACCOUNT: "REMOVE_ACCOUNT",
};

export const PAGES = {
  ACCOUNTS: "ACCOUNTS",
  NEW_ACCOUNT: "NEW_ACCOUNT",
  ACCOUNT_PAGE: "ACCOUNT_PAGE",
  EDIT_ACCOUNT: "EDIT_ACCOUNT",
};

export const initialState = {
  allAccountsCurrentPage: 1,
  page: PAGES.ACCOUNTS,
  accounts: [],
  account: {},
};

const accountsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_TYPE:
      console.log(ACTIONS.SET_TYPE, payload);
      return {
        ...state,
        type: payload.type,
      };
    case ACTIONS.SET_PAGE:
      console.log(ACTIONS.SET_PAGE, payload);
      return {
        ...state,
        page: payload.page,
      };
    case ACTIONS.ADD_ACCOUNT:
      let isNotIncluded = true;
      state.accounts.forEach((account) => {
        isNotIncluded &= account.id !== payload.account.id;
      });
      if (isNotIncluded) {
        const newAccounts = [...state.accounts, payload.account];
        return {
          ...state,
          accounts: newAccounts,
        };
      } else {
        return state;
      }
    case ACTIONS.REMOVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          (currentItem) => currentItem.id !== payload.accountID
        ),
      };
    case ACTIONS.SET_ACCOUNT:
      console.log(ACTIONS.SET_ACCOUNT, payload);
      return {
        ...state,
        account: payload.account,
      };
    default:
      throw new Error(`No case for type ${type} found in accountsReducer`);
  }
};

export default accountsReducer;
