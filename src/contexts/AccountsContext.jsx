import { createContext, useReducer, useContext, useMemo } from "react";
import accountsReducer, {
  initialState,
  ACTIONS,
  PAGES,
} from "../reducers/accountsReducer";

const AccountsContext = createContext(initialState);

export const AccountsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountsReducer, initialState);

  const value = useMemo(() => {
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

    const setPage = (page) => {
      dispatch({
        type: ACTIONS.SET_PAGE,
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

    const setAccount = (account) => {
      dispatch({
        type: ACTIONS.SET_ACCOUNT,
        payload: {
          account,
        },
      });
    };

    const resetAccount = () => {
      dispatch({
        type: ACTIONS.SET_ACCOUNT,
        payload: {
          selectedAccount: {},
        },
      });
    };

    const updateAccount = (field, value) => {
      dispatch({
        type: ACTIONS.UPDATE_ACCOUNT,
        payload: {
          field,
          value,
        },
      });
    };

    return {
      type: state.type,
      page: state.page,
      accounts: state.accounts,
      account: state.account,
      setType,
      setPage,
      resetAccounts,
      addToAccounts,
      removeFromAccounts,
      setAccount,
      resetAccount,
      updateAccount,
      PAGES,
    };
  }, [state]);

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
