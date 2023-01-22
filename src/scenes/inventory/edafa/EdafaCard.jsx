import { Box, Typography, useMediaQuery } from "@mui/material";

import FormContainer from "../../../components/FormContainer";
import { getFormatedDate } from "../../../utils/dateFormatting";
import { pad } from "../../../utils/functions";

const EdafaCard = ({ item }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <FormContainer padding="15px">
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        sx={{ gridColumn: "span 4", cursor: "pointer" }}
      >
        <Box display="flex" width="100%" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box gap="20px" display="flex" width={isNonMobile ? "300px" : "150px"}>
              {isNonMobile && (
                <Typography variant="h2">
                  {"ED" + pad(item.edafaNumber, 3)}
                </Typography>
              )}
              <Box display="flex" width="100%" justifyContent="space-between">
                <Box>
                  <Typography>{item.name}</Typography>
                  <Typography>{item?.mpn}</Typography>
                </Box>
                {isNonMobile && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                  >
                    <Typography>{item.category}</Typography>
                    <Typography>{item.make}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography variant="h4">
                {getFormatedDate(item.edafaDate)}
              </Typography>
              <Typography>
                {item.supplierEnglishName ?? item.supplierArabicName}
                {" - "}
                {item.quantity}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </FormContainer>
  );
};

export default EdafaCard;
