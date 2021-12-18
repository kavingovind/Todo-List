import * as React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import TaskLists from "./components/TaskLists";
import { styled } from "@mui/material/styles";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const App = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ margin: "4% auto" }}>
        <Paper elevation={4}>
          <Box sx={{ width: "100%" }}>
            <Div sx={{ display: "flex", justifyContent: "center" }}>
              To-do App
            </Div>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                centered
              >
                <Tab id="todo" label="Tasks List" aria-label="todo" />
                <Tab id="done" label="Completed" aria-label="done" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <TaskLists />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Work In Progess
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default App;
