import * as React from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FinalResults from "./FinalResuls/FinalResults";
import JsonOutputData from "./JSONTab/JsonOutputData";
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
        <Box>
          <Typography>{children}</Typography>
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

const Content = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Final Results" {...a11yProps(0)} />
          <Tab label="JSON" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} sx={{ p: 0 }}>
        <FinalResults />
      </TabPanel>
      <TabPanel value={value} index={1} sx={{ p: 0 }}>
        <JsonOutputData />
      </TabPanel>
      <footer>
        <Grid
          container
          justifyContent="right"
          sx={{ px: 2, pb: 2 }}
          spacing={1}
        >
          <Grid item>
            <Button variant="contained">Approve File</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Reject File</Button>
          </Grid>
        </Grid>
      </footer>
    </Box>
  );
};

export default Content;
