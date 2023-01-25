import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h5" color={colors.yellowAccent[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
