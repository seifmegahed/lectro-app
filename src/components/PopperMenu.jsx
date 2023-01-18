import {
  useTheme,
  MenuItem,
  Popper,
  ClickAwayListener,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { tokens } from "../theme";

const PopperMenu = ({ menuItems, element, handleClose, placement }) => {
  const open = Boolean(element);

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
            <MenuItemSelector
              key={index}
              item={item}
              lastItem={index + 1 === menuItems.length}
              handleClose={handleClose}
            />
          ))}
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

const MenuItemSelector = ({ item, lastItem, handleClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const arabicMenuItemStyle = {
    borderBottom: `1px solid ${colors.primary[700]}`,
    justifyContent: "flex-end",
    fontWeight: "bold",
  };

  const englishMenuItemStyle = {
    borderBottom: `1px solid ${colors.primary[700]}`,
  };
  if (item.type === "Link") {
    return (
      <Link to={item.href} style={{textDecoration: "none", color: "inherit"}}>
        <MenuItem
          size="small"
          disabled={item.disabled}
          sx={
            item.arabic
              ? arabicMenuItemStyle
              : lastItem
              ? {}
              : englishMenuItemStyle
          }
          onClick={() => {
            handleClose();
          }}
        >
          {!!item.color ? (
            <Typography color={item.color}>{item.label}</Typography>
          ) : (
            <>{item.label}</>
          )}
        </MenuItem>
      </Link>
    );
  } else {
    return (
      <MenuItem
        size="small"
        disabled={item.disabled}
        sx={
          item.arabic
            ? arabicMenuItemStyle
            : lastItem
            ? {}
            : englishMenuItemStyle
        }
        onClick={() => {
          handleClose();
          item.callback();
        }}
      >
        {!!item.color ? (
          <Typography color={item.color}>{item.label}</Typography>
        ) : (
          <>{item.label}</>
        )}
      </MenuItem>
    );
  }
};

export default PopperMenu;
