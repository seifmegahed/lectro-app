import { useState } from "react";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";

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
    {
      title: "Study Settings",
      path: "/study-settings",
    },
  ],
  Products: [
    {
      title: "Products",
      path: "/products",
    },
  ],
  Inventory: [
    {
      title: "Items",
      path: "/items",
    },
    {
      title: "Delivery Notes",
      path: "/delivery-notes",
    },
    {
      title: "Exchange Vouchers",
      path: "/exchange-vouchers",
    },
  ],
  Purchasing: [
    {
      title: "Suppliers",
      path: "/suppliers",
    },
    {
      title: "Purchase Requests",
      path: "/purchase-requests",
    },
    {
      title: "Receipt Vouchers",
      path: "/reciept-vouchers",
    },
    {
      title: "Return Vouchers",
      path: "/return-vouchers",
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
const pageKeys = Object.keys(pages);

const Sidebar = ({isCollapsed, toggle}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
        component="nav"
        height="100"
        pt="75px"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
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
        >
          <Menu>
              {/* USER */}
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
                    Admin
                  </Typography>
                </Box>
               </Box>
            <Box paddingLeft="10%">
              <div
                onClick={() => toggle(false)}
              >
                <Item
                  title="Home"
                  to="/"
                  selected={selected}
                  setSelected={setSelected}
                /> 
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
                    <div
                      key={item.title}
                      onClick={() => toggle(false)}
                    >
                      <Item
                        title={item.title}
                        to={item.path}
                        selected={selected}
                        setSelected={setSelected}
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
