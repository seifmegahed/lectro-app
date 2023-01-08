import { Box, Typography } from "@mui/material";

import useAccounts from "../../contexts/AccountsContext";
import { accountFields } from "../../data/fields";

import FormContainer from "../../components/FormContainer";
import AutoForm from "../../components/AutoForm";

const NewAccount = ({type}) => {
  const { accountsLength, setPage, PAGES } = useAccounts();
  const newAccount = {
    number: accountsLength + 1,
    type: type,
  };
  const returnHome = () => {
    setPage(PAGES.ACCOUNTS);
  };
  return (
    <FormContainer>
      <Box sx={{ gridColumn: "span 4" }}>
        <Typography variant="h3" mb="20px">
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
