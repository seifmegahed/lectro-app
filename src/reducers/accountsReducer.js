export const ACTIONS = {
  SET_PAGE: "SET_PAGE",
  SET_ACCOUNT: "SET_ACCOUNT",
  SET_NEW_ACCOUNT: "SET_NEW_ACCOUNT",
  SET_ACCOUNTS_LENGTH: "SET_ACCOUNTS_LENGTH",
};

export const initialState = {
  page: "ALL_ACCOUNTS",
  accountsLength: 0,
  newAccount: {},
  account: {},
};

const accountsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_PAGE:
      console.log(ACTIONS.SET_PAGE, payload);
      return {
        ...state,
        page: payload.page,
      };
    case ACTIONS.SET_ACCOUNT:
      console.log(ACTIONS.SET_ACCOUNT, payload);
      return {
        ...state,
        account: payload.account,
      };
    case ACTIONS.SET_NEW_ACCOUNT:
      console.log(ACTIONS.SET_NEW_ACCOUNT, payload);
      return {
        ...state,
        newAccount: payload.newAccount,
      };
    case ACTIONS.SET_ACCOUNTS_LENGTH:
      console.log(ACTIONS.SET_ACCOUNTS_LENGTH, payload);
      return {
        ...state,
        accountsLength: payload.accountsLength,
      };
    default:
      throw new Error(`No case for type ${type} found in accountsReducer`);
  }
};

export default accountsReducer;
