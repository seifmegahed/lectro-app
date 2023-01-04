import { Box, Typography } from "@mui/material";

import useAccounts from "../../contexts/AccountsContext";
import { accountFields } from "../../data/fields";

import FormContainer from "../../components/FormContainer";
import AutoForm from "../../components/AutoForm";

export const ACTIONS = {
  RESET: "reset",
  UPDATE: "update",
};

const NewAccount = () => {
  return (
    <FormContainer>
      <Box sx={{ gridColumn: "span 4" }}>
        <Typography variant="h3" mb="20px">
          New Item
        </Typography>
      </Box>
      <AutoForm
        fields={accountFields}
        type="accounts"
      />
    </FormContainer>
  );
};

export default NewAccount;
