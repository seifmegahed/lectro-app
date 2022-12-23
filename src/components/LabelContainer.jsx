import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";

const LabelContainer = ({ children, label }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box 
      width="100%"
    >

      <Typography color="text.secondary" variant="h4">{label}</Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        gap="10px"
        p={isNonMobile ? "20px 20px" : "20px 10px"}
        mb="30px"
        border={`2px Solid ${colors.grey[800]}`}
        borderRadius="10px"
        minWidth="250px"
        sx={{
          "& > div": {
            gridColumn: isNonMobile ? undefined : "span 4",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LabelContainer;
