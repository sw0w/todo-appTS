import { useState } from "react";
import Button from "@mui/material/Button";
import TodoForm from "../addForm/addForm";

interface Todo {
  _id: string;
  todo: string;
  completed: boolean;
}

interface TodoInputProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoInput: React.FC<TodoInputProps> = ({ task, setTask, setTodos }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleAddToDo = async () => {
    if (!task.trim()) return;

    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        console.error("User not authenticated");
        return;
      }

      const res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ todo: task }),
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const data: { todos: Todo[] } = await res.json();
      setTodos(data.todos);

      setTask("");
      setIsVisible(false);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
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
