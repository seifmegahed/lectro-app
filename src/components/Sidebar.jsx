import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../theme";
import { useAuth } from "../contexts/AuthContext";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import { Box, Typography, useTheme } from "@mui/material";

const pages = {
  Sales: [
    {
      title: "Projects",
      path: "/projects",
    },
    {
      title: "Clients",
      path: "/clients",
    },
  ],
  Inventory: [
    {
      title: "Items",
      path: "/inventory",
    },
    {
      title: "Edafa",
      path: "/inventory/edafa",
    },
    {
      title: "Finished Goods",
      path: "/inventory/finished-goods/",
    },
    {
      title: "Delivery Notes",
      path: "/inventory/delivery-notes/",
    },
    {
      title: "Products",
      path: "/inventory/products/",
    },
  ],
  Purchasing: [
    {
      title: "Purchase Requests",
      path: "/purchase-requests",
    },
    {
      title: "Suppliers",
      path: "/suppliers",
    },
  ],
  Manufacturing: [
    {
      title: "Under Manufacturing",
      path: "/under-manufacturing",
    },
    {
      title: "Quality Control",
      path: "/quality-control",
    },
    {
      title: "Repair",
      path: "repair",
    },
  ],
};

const Item = ({ title, path, currentLocation }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={currentLocation === path}
      style={{
        color: colors.grey[100],
      }}
    >
      <Typography>{title}</Typography>
      <Link to={path} />
    </MenuItem>
  );
};

const pageKeys = Object.keys(pages);

const Sidebar = ({ isCollapsed, toggle }) => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const { currentUser } = useAuth();

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  return (
    <Box
      component="nav"
      height="100%"
      boxShadow="0px 3px 8px rgba(0, 0, 0, 0.24)"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[700]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 15px 5px 25px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.blueAccent[400]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.blueAccent[300]} !important`,
        },
      }}
    >
      <ProSidebar
        toggled={isCollapsed}
        onToggle={toggle}
        breakPoint="md"
        sx={{ height: "100%" }}
      >
        <Menu>
          {/* USER */}
          <Box pt="70px" mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={currentUser.photoURL || `./images/user.png`}
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
                {currentUser.displayName}
              </Typography>
              <Typography variant="h6" color={colors.blueAccent[300]}>
                {currentUser.email}
              </Typography>
            </Box>
          </Box>
          <Box paddingLeft="10%">
            <div onClick={() => toggle(false)}>
              <Item title="Home" path="/" currentLocation={currentLocation} />
            </div>
            {pageKeys.map((key) => (
              <div key={key}>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 15px" }}
                >
                  {key}
                </Typography>
                {pages[key].map((item) => (
                  <div key={item.title} onClick={() => toggle(false)}>
                    <Item
                      title={item.title}
                      path={item.path}
                      currentLocation={currentLocation}
                    />
                  </div>
                ))}
              </div>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
