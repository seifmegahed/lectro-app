import { Box, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";

const FormContainer = ({ children, padding }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box
      display="grid"
      p={!!padding ? padding : (isNonMobile ? "30px" : "15px")}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      borderRadius="10px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      minWidth="300px"
      gap="20px"
      sx={{
        backgroundColor: `${colors.primary[700]}`,
        "& > div": {
          gridColumn: isNonMobile ? undefined : "span 4",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default FormContainer