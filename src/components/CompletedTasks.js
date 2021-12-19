import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

const CompletedTasks = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showSnackBar, setSnackBar] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBar(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/task/?status=Inactive"
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

  const onTaskUpdate = async (task) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/task/update/${task._id}`,
        {
          status: "Active",
        }
      );
      if (response.data.status === "success") {
        setSnackBar(true);
        setSnackBarMsg("Task moved to Active List");
        getData();
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onTaskDelete = async (task) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/task/delete/${task._id}`
      );
      if (response.data.status === "success") {
        setSnackBar(true);
        setSnackBarMsg("Task deleted.");
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
                <ListItem
                  key={task._id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onTaskDelete(task)}
                    >
                      <DeleteForever />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="end"
                        checked={task.status === "Inactive"}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={() => onTaskUpdate(task)}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={task.taskName}
                      sx={{ textDecoration: "line-through" }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </>
      )}
      <Snackbar
        open={showSnackBar}
        onClose={closeSnackBar}
        autoHideDuration={6000}
        message={snackBarMsg}
      />
    </React.Fragment>
  );
};

export default CompletedTasks;
