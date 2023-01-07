import {
  useTheme,
  MenuItem,
  Popper,
  ClickAwayListener,
  Paper,
} from "@mui/material";

import { tokens } from "../theme";

const PopperMenu = ({ menuItems, element, handleClose, placement }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const open = Boolean(element);
  const arabicMenuItemStyle = {
    borderBottom: `1px solid ${colors.primary[700]}`,
    justifyContent: "flex-end",
    fontWeight: "bold",
  };

  const englishMenuItemStyle = {
    borderBottom: `1px solid ${colors.primary[700]}`,
  };
  return (
    <Popper
      id="moreMenu"
      aria-labelledby="moreMenuButton"
      anchorEl={element}
      open={open}
      onClose={handleClose}
      placement={placement || "bottom-start"}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Paper sx={{ width: "140px" }}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              size="small"
              disabled={item.disabled}
              sx={
                item.arabic
                  ? arabicMenuItemStyle
                  : index+1 === menuItems.length
                  ? {}
                  : englishMenuItemStyle
              }
              onClick={() => {
                handleClose();
                item.callback();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default PopperMenu;
