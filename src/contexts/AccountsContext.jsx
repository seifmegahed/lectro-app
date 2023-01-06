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

    const modifyAccount = (account) => {
      dispatch({
        type: ACTIONS.REMOVE_ACCOUNT,
        payload: {
          AccountId: account.id,
        },
      });
      dispatch({
        type: ACTIONS.ADD_ACCOUNT,
        payload: {
          account,
        },
      });
      if (account.id === state.account.id)
        dispatch({
          type: ACTIONS.SET_ACCOUNT,
          payload: {
            account,
          },
        });
    };

    return {
      PAGES,
      type: state.type,
      page: state.page,
      account: state.account,
      accounts: state.accounts,
      setType,
      setPage,
      setAccount,
      modifyAccount,
      addToAccounts,
      removeFromAccounts,
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
