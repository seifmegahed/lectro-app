export const ACTIONS = {
  SET_TYPE: "SET_TYPE",
  UPDATE_PAGE: "UPDATE_PAGE",
  RESET_ACCOUNTS: "RESET_ACCOUNTS",
  ADD_ACCOUNT: "ADD_ACCOUNT",
  REMOVE_ACCOUNT: "REMOVE_ACCOUNT",
  UPDATE_SELECTED_ACCOUNT: "UPDATE_SELECTED_ACCOUNT",
};

export const PAGES = {
  ACCOUNTS: "ACCOUNTS",
  NEW_ACCOUNT: "NEW_ACCOUNT",
  ACCOUNT_PAGE: "ACCOUNT_PAGE",
  EDIT_ACCOUNT: "EDIT_ACCOUNT",
};

export const initialState = {
  page: PAGES.ACCOUNTS,
  accounts: [],
  selectedAccount: {},
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
    case ACTIONS.UPDATE_PAGE:
      console.log(ACTIONS.UPDATE_PAGE, payload);
      return {
        ...state,
        page: payload.page,
      };
    case ACTIONS.RESET_ACCOUNTS:
      console.log(ACTIONS.RESET_ACCOUNTS);
      return {
        ...state,
        accounts: [],
      };
    case ACTIONS.ADD_ACCOUNT:
      let isNotIncluded = true;
      state.accounts.forEach((account) => {
        isNotIncluded &= account.id !== payload.account.id;
      });
      if (isNotIncluded) {
        const newAccounts = [...state.accounts, payload.account];
        newAccounts.sort((a, b) => {
            if (a.number > b.number) return 1;
            if (a.number < b.number) return -1;
            return 0;
        });
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
    case ACTIONS.UPDATE_SELECTED_ACCOUNT:
      console.log(ACTIONS.UPDATE_SELECTED_ACCOUNT, payload);
      return {
        ...state,
        selectedAccount: payload.selectedAccount,
      };
    default:
      throw new Error(`No case for type ${type} found in accountsReducer`);
  }
};

export default accountsReducer;
