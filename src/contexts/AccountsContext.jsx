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
      dispatch({
        type: ACTIONS.SET_ALLACCOUNTS_CURRENTPAGE,
        payload: {
          currentPage: 1,
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

    return {
      PAGES,
      page: state.page,
      account: state.account,
      setPage,
      setAccount,
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
