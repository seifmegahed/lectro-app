import { Button, useTheme } from "@mui/material";
import { tokens } from "../theme";

const NavButton = ({ cb, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      variant="cointained"
      onClick={cb}
      sx={{
        width: "6rem",
        height: "2.5rem",
        color: "#fcfcfc",
        backgroundColor: `${colors.blueAccent[500]}`,
        "&:hover": {
          backgroundColor: `${colors.blueAccent[400]}`,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default NavButton;
