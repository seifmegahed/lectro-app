import {
  Box,
  Typography,
  useMediaQuery,
  Table,
  TableBody,
} from "@mui/material";

import useAccounts from "../../contexts/AccountsContext";

import DataDisplay from "../../components/DataDisplay";
import FormContainer from "../../components/FormContainer";
import { accountFields } from "../../data/fields";

const AccountPage = () => {
  const { selectedAccount } = useAccounts();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <FormContainer>
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        sx={{ gridColumn: "span 4" }}
      >
        <Box display="flex" width="100%" justifyContent="space-between">
          <Box display="flex">
            <Box width="60px" display="flex" justifyContent="center">
              <Typography
                variant={isNonMobile ? "h1" : "h2"}
                sx={{ cursor: "pointer" }}
              >
                {selectedAccount.number}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography color="text.primary" variant="h3">
                {selectedAccount.englishName}
              </Typography>
              <Typography color="text.secondary" variant="h5">
                {selectedAccount.arabicName}
              </Typography>
            </Box>
          </Box>
          {isNonMobile && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Typography color="text.secondary">
                {selectedAccount.id}
              </Typography>
              <Typography color="text.secondary" variant="h5">
                {selectedAccount.taxNumber}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {isNonMobile && <Box sx={{ gridColumn: "span 1" }}></Box>}
      <Table
        size="small"
        sx={{ gridColumn: `span ${isNonMobile ? "3" : "4"}`, width: "100%" }}
      >
        <TableBody>
          {accountFields.map(
            (field) =>
              !!selectedAccount[field.name] &&
              field.display && (
                <DataDisplay
                  key={field.name}
                  data={selectedAccount[field.name]}
                  details={field}
                />
              )
          )}
        </TableBody>
      </Table>
    </FormContainer>
  );
};

export default AccountPage;
