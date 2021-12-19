import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

const AddTask = (props) => {
  const [taskName, setTaskName] = useState("");
  const [showSnackBar, setSnackBar] = useState(false);

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBar(false);
  };

  const onAddTask = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/task/create`, {
        taskName,
        status: "Active",
      });
      console.log(response);
      if (response.data.status === "success") {
        setSnackBar(true);
        setTaskName("");
        props.handleAddTask();
        props.reload();
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={props.visible} onClose={props.handleAddTask}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="Task Name"
            type="text"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAddTask}>Cancel</Button>
          <Button onClick={onAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackBar}
        onClose={closeSnackBar}
        autoHideDuration={6000}
        message={"Task Added Successfully!"}
      />
    </React.Fragment>
  );
};

export default AddTask;
