import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";

const taskStatuses = ["open", "pending", "inprog", "complete"];

function App() {
  const [tasks, setTasks] = useState([
    { title: "Task 1", status: "open" },
    { title: "Task 2", status: "pending" },
    { title: "Task 3", status: "inprog" },
    { title: "Task 4", status: "complete" },
  ]);

  const [newTask, setNewTask] = useState({ title: "", status: "open" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({ title: "", status: "open" });
    setIsModalOpen(false);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === currentTask.index
        ? { title: currentTask.title, status: currentTask.status }
        : task
    );
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };

  const openModal = (task = null, index = null) => {
    if (task) {
      setCurrentTask({ ...task, index });
    } else {
      setCurrentTask(null);
    }
    setIsModalOpen(true);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography className="text-center" variant="h4" gutterBottom>
        Task Manager
      </Typography>
      <Button variant="contained" onClick={() => openModal()}>
        Add Task
      </Button>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {taskStatuses.map((status) => (
          <Grid item xs={3} key={status}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  {status.charAt(0).toUpperCase() + status.slice(1)} Tasks
                </Typography>
                {getTasksByStatus(status).map((task, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <Typography variant="h6">{task.title}</Typography>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() =>
                          openModal(
                            task,
                            tasks.findIndex((t) => t === task)
                          )
                        }
                        variant="outlined"
                        endIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          deleteTask(tasks.findIndex((t) => t === task))
                        }
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>{currentTask ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            value={currentTask ? currentTask.title : newTask.title}
            onChange={(e) =>
              currentTask
                ? setCurrentTask({ ...currentTask, title: e.target.value })
                : setNewTask({ ...newTask, title: e.target.value })
            }
          />
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            value={currentTask ? currentTask.status : newTask.status}
            onChange={(e) =>
              currentTask
                ? setCurrentTask({ ...currentTask, status: e.target.value })
                : setNewTask({ ...newTask, status: e.target.value })
            }
          >
            {taskStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={currentTask ? updateTask : addTask}>
            {currentTask ? "Update Task" : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
