import { Box, Typography } from "@mui/material";

import useAccounts from "../../contexts/AccountsContext";
import { accountFields } from "../../data/fields";

import FormContainer from "../../components/FormContainer";
import AutoForm from "../../components/AutoForm";

export const ACTIONS = {
  RESET: "reset",
  UPDATE: "update",
};

const NewAccount = ({type}) => {
  const { accounts, setPage, PAGES } = useAccounts();
  const newAccount = {
    number: accounts.length + 1,
    type: type,
  };
  const returnHome = () => {
    setPage(PAGES.ALL_ACOUNTS);
  };
  return (
    <FormContainer>
      <Box sx={{ gridColumn: "span 4" }}>
        <Typography variant="h3" mb="20px">
          New Item
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
