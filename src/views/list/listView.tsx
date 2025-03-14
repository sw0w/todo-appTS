import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/header";
import TodoInput from "./components/addTodo/addbutton/addbutton";
import TodoList from "./components/list/list";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  isEditing?: boolean;
  userId: number;
};

type TemporaryText = {
  id: number;
  text: string;
};

const ListView = () => {
  useEffect(() => {
    document.body.style.overflowY = "scroll";
    document.body.style.scrollbarWidth = "none";

    const style = document.createElement("style");
    style.innerHTML = "::-webkit-scrollbar { display: none; }";
    document.head.appendChild(style);

    return () => {
      document.body.style.overflowY = "auto";
      document.head.removeChild(style);
    };
  }, []);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");
  const [temporarytext, settemptext] = useState<TemporaryText[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          console.error("No token found, redirecting...");
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/todos/", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch todos");
          return;
        }

        const data = await response.json();
        console.log(data);
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    fetchTodos();
  }, []);

  const toggleEdit = (id: string) => {
    console.log("Toggle Edit ID:", id);
    setTodos((prev: Todo[]) =>
      prev.map((todo) => {
        const todoId = todo._id ? todo._id.toString() : null;

        if (todoId === id) {
          return { ...todo, isEditing: !todo.isEditing };
        }

        return todo;
      })
    );
  };

  const save = async (id: string) => {
    const temp = temporarytext.find((item) => item.id === id);
    if (temp) {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          console.error("No token found, redirecting...");
          navigate("/login");
          return;
        }

        const response = await fetch(`http://localhost:5000/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            todo: temp.text,
            completed: false,
          }),
        });

        if (!response.ok) {
          console.error("Failed to save todo to the server.");
          return;
        }

        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id
              ? { ...todo, todo: temp.text, isEditing: false }
              : todo
          )
        );
      } catch (error) {
        console.error("Error saving todo:", error);
      }
    }
  };

  const back = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.error("No token found, redirecting...");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }
        return response.json();
      })
      .then((data) => {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete todo from the server:", error);
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Header />
        <Box className="half-background" />
        <TodoInput task={task} setTask={setTask} setTodos={setTodos} />
        <TodoList
          todos={todos}
          toggleEdit={toggleEdit}
          temporarytext={temporarytext}
          settemptext={settemptext}
          save={save}
          back={back}
          DeleteTodo={deleteTodo}
        />
      </Box>
    </>
  );
};

export default ListView;
