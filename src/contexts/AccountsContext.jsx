import { createContext, useReducer, useContext, useMemo } from "react";
import accountsReducer, {
  initialState,
  ACTIONS,
  PAGES,
} from "../reducers/accountsReducer";

const AccountsContext = createContext(initialState);

export const AccountsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountsReducer, initialState);

  const setType = (type) => {
    dispatch({
      type: ACTIONS.SET_TYPE,
      payload: {
        type,
      },
    });
  };

  const resetAccounts = () => {
    dispatch({
      type: ACTIONS.RESET_ACCOUNTS,
    });
  };

  const updatePage = (page) => {
    dispatch({
      type: ACTIONS.UPDATE_PAGE,
      payload: {
        page,
      },
    });
  };

  const addToAccounts = (account) => {
    dispatch({
      type: ACTIONS.ADD_ACCOUNT,
      payload: {
        account,
      },
    });
  };

  const removeFromAccounts = (accountID) => {
    dispatch({
      type: ACTIONS.REMOVE_ACCOUNT,
      payload: {
        accountID,
      },
    });
  };

  const updateSelectedAccount = (selectedAccount) => {
    dispatch({
      type: ACTIONS.UPDATE_SELECTED_ACCOUNT,
      payload: {
        selectedAccount,
      },
    });
  };

  const value = useMemo(
    () => ({
      type: state.type,
      page: state.page,
      accounts: state.accounts,
      selectedAccount: state.selectedAccount,
      setType,
      updatePage,
      resetAccounts,
      addToAccounts,
      removeFromAccounts,
      updateSelectedAccount,
      PAGES,
      ACTIONS,
    }),
    [state]
  );

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
};

const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error("useAccounts should be used within AccountsContext");
  }
  return context;
};

export default useAccounts;
