import { Box, Typography } from "@mui/material";

import useAccounts from "../../contexts/AccountsContext";
import { accountFields } from "../../data/fields";

import FormContainer from "../../components/FormContainer";
import AutoForm from "../../components/AutoForm";

const NewAccount = ({ type }) => {
  const { accountsLength, setPage, PAGES } = useAccounts();

  const newAccount = {
    number: accountsLength + 1,
    type: type,
  };
  const returnHome = (data) => {
    // if (!!data.id) setNewAccount(data);
    setPage(PAGES.ALL_ACCOUNTS);
  };
  return (
    <FormContainer>
      <Box display="flex" gap="20px" sx={{ gridColumn: "span 4" }}>
        <Typography variant="h1">
          {newAccount.number}
        </Typography>
        <Typography variant="h2" alignSelf="center">
          New Account
        </Typography>
      </Box>
      <AutoForm
        initData={newAccount}
        returnHome={returnHome}
        fields={accountFields}
        collectionName="accounts"
      />
    </FormContainer>
  );
};

export default NewAccount;
