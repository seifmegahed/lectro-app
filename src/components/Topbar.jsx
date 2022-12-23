import {
  Box,
  useMediaQuery,
  IconButton,
  Typography,
  useTheme,
  AppBar,
  Popper,
  MenuItem,
  Paper,
  ClickAwayListener,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { MenuOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Topbar = ({ collapse }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { logIn, logOut, currentUser } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const breakPoint = useMediaQuery("(min-width:768px)", { noSsr: true });
  return (
    <Box>
      <AppBar component="nav">
        <Box
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
          width={breakPoint ? "100%" : "100%"}
          display="flex"
          justifyContent="space-between"
          p={2}
          sx={{
            flexGrow: "1",
            backgroundColor: `${colors.primary[700]}`,
          }}
        >
          <Box display="flex" alignItems="center">
            {!breakPoint && currentUser && (
              <IconButton onClick={() => collapse(true)}>
                <MenuOutlined />
              </IconButton>
            )}
            <Typography variant="h2" ml="10px" color={colors.grey[100]}>
              Lectro
            </Typography>
          </Box>

          {/* Icons */}
          {!!currentUser ? (
            <Box display="flex" zIndex="1">
              <IconButton>
                <NotificationsOutlinedIcon />
              </IconButton>
              <IconButton
                id="accountButton"
                aria-controls={open ? "accountMenu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <PersonOutlinedIcon />
              </IconButton>
              <Popper
                id="accountMenu"
                aria-labelledby="accountButton"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                placement="bottom-start"
                sx={{ zIndex: "10001" }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <Paper>
                    <MenuItem onClick={handleClose}>Account</MenuItem>
                    <MenuItem
                      onClick={() => {
                        colorMode.toggleColorMode();
                        handleClose();
                      }}
                    >
                      {theme.palette.mode === "dark"
                        ? "Light Mode"
                        : "Dark Mode"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logOut();
                        handleClose();
                      }}
                    >
                      Log Out
                    </MenuItem>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </Box>
          ) : (
            <Button onClick={logIn}>
              <Typography variant="h4">Log in</Typography>
            </Button>
          )}
        </Box>
      </AppBar>
    </Box>
  );
};

export default Topbar;
