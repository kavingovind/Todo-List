import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import AddTask from "./AddTask";

const TaskList = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [visible, setVisibility] = useState(false);
  const [showSnackBar, setSnackBar] = useState(false);

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBar(false);
  };

  const handleAddTask = () => {
    setVisibility(!visible);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/task/?status=Active"
      );
      if (response.data.status === "success") {
        setTasks(response.data.tasks);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const onTaskComplete = async (task) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/task/update/${task._id}`,
        {
          status: "Inactive",
        }
      );
      if (response.data.status === "success") {
        setSnackBar(true);
        getData();
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      {loading && <LinearProgress color="secondary" />}
      {!loading && (
        <>
          <List
            sx={{
              width: "100%",
              maxHeight: 325,
              overflow: "auto",
              bgcolor: "background.paper",
            }}
          >
            {tasks.map((task) => {
              const labelId = task._id;
              return (
                <ListItem key={task._id} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={() => onTaskComplete(task)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="end"
                        checked={task.status === "Active"}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={() => onTaskComplete(task)}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={task.taskName} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Button
            sx={{ mt: 1 }}
            color="secondary"
            variant="contained"
            onClick={handleAddTask}
          >
            New Task
            <AddIcon />
          </Button>
          <AddTask
            visible={visible}
            handleAddTask={handleAddTask}
            reload={getData}
          />
        </>
      )}
      <Snackbar
        open={showSnackBar}
        onClose={closeSnackBar}
        autoHideDuration={6000}
        message={"Task Closed!"}
      />
    </React.Fragment>
  );
};

export default TaskList;
