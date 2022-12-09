import { useState } from "react";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import { Box, IconButton, Typography, useTheme } from "@mui/material";

import {
  MenuOutlined as MenuOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  PeopleOutlined as PeopleOutlinedIcon,
  ContactsOutlined as ContactsOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  CalendarTodayOutlined as CalendarTodayOutlinedIcon,
  HelpOutlineOutlined as HelpOutlineOutlinedIcon,
  BarChartOutlined as BarChartOutlinedIcon,
  PieChartOutlined as PieChartOutlineOutlinedIcon,
  TimelineOutlined as TimelineOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon
} from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[700]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 15px 5px 15px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.blueAccent[400]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.blueAccent[300]} !important`,
        },
      }}
      
    >
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0px 0 10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <MenuItem>
            {/* USER */}
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../assets/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                    >
                    Seif Megahed
                  </Typography>
                  <Typography variant="h6" color={colors.blueAccent[300]}>
                    seif.megahed@gmail.com
                  </Typography>
                </Box>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
          </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
