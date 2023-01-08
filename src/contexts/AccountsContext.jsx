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
    const setPage = (page) => {
      dispatch({
        type: ACTIONS.SET_PAGE,
        payload: {
          page,
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

    const setAccountsLength = (accountsLength) => {
      dispatch({
        type: ACTIONS.SET_ACCOUNTS_LENGTH,
        payload: {
          accountsLength,
        },
      });
    };

    const setNewAccount = (newAccount) => {
      dispatch({
        type: ACTIONS.SET_NEW_ACCOUNT,
        payload: {
          newAccount,
        },
      });
    }

    return {
      PAGES,
      page: state.page,
      account: state.account,
      newAccount: state.newAccount,
      accountsLength: state.accountsLength,
      setPage,
      setAccount,
      setNewAccount,
      setAccountsLength,
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
