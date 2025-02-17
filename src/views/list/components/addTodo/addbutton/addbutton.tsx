import { useState } from "react";
import Button from "@mui/material/Button";
import TodoForm from "../addForm/addForm";

interface TodoInputProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<
    React.SetStateAction<
      { id: number; todo: string; completed: boolean; userId: number }[]
    >
  >;
}

const TodoInput = ({ task, setTask, setTodos }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleAddToDo = () => {
    if (!task.trim()) return;

    fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: task, completed: false, userId: 5 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prev) => [...prev, data]);
        setTask("");
        setIsVisible(false);
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  return (
    <div>
      <Button
        data-testid="add-btn"
        variant="contained"
        style={{
          backgroundColor: "#3f51b5",
          height: 65,
          width: 65,
          borderRadius: "50%",
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
          fontSize: "24px",
        }}
        onClick={toggleVisibility}
      >
        +
      </Button>

      {isVisible && (
        <TodoForm task={task} setTask={setTask} handleAddToDo={handleAddToDo} />
      )}
    </div>
  );
};

export default TodoInput;
