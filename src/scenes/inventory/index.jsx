import Header from "../../components/Header";
import { Box, Tabs, Tab, Divider } from "@mui/material";
import { useState } from "react";
import NewItem from "./NewItem";
import PropTypes from 'prop-types';
import AllItems from "./items";

const Items = () => {
  const [value, setValue] = useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box m="20px" maxWidth="700px">
      <Box display="flex" gap="10px" flexDirection="column">
        <Header title="Items in Store" subtitle="" />
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Items" {...a11yProps(0)} />
            <Tab label="Recieve Item" {...a11yProps(1)} />
            <Tab label="Retrun Item" {...a11yProps(2)} />
            <Tab label="New Item" {...a11yProps(3)} />
          </Tabs>
          <Divider />
          <TabPanel value={value} index={0}>
            <AllItems />
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
          <TabPanel value={value} index={3}>
            <NewItem />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt="20px">
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Items;
