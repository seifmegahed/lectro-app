import { Box, Typography } from "@mui/material";

import useAccounts from "../../contexts/AccountsContext";
import { accountFields } from "../../data/fields";

import FormContainer from "../../components/FormContainer";
import AutoForm from "../../components/AutoForm";

const EditAccount = () => {
  const { account, setPage, setAccount, PAGES } = useAccounts();

  const returnHome = (data) => {
    if (!!data) setAccount({ ...account, ...data });
    setPage(PAGES.ACCOUNT_PAGE);
  };

  return (
    <FormContainer>
      <Box sx={{ gridColumn: "span 4" }}>
        <Typography variant="h3" mb="20px">
          Edit Account
        </Typography>
      </Box>
      <AutoForm
        initData={account}
        returnHome={returnHome}
        fields={accountFields}
        collectionName="accounts"
        edit={true}
      />
    </FormContainer>
  );
};

export default EditAccount;
