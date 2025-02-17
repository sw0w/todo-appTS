import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const TodoForm = ({ task, setTask, handleAddToDo }) => {
  return (
    <Box
      data-testid="textbox"
      sx={{
        position: "fixed",
        bottom: "90px",
        right: "20px",
        backgroundColor: "white",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1100,
        width: "300px",
        borderRadius: "8px",
      }}
    >
      <TextField
        data-testid="input"
        label="Add a new task"
        variant="filled"
        multiline
        rows={6}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      <Button
        data-testid="submit"
        variant="contained"
        onClick={handleAddToDo}
        sx={{ marginTop: "12px" }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TodoForm;
