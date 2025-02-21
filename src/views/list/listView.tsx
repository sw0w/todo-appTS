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
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodos();
  }, []);

  const toggleEdit = (id: number) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const save = (id: number) => {
    const temp = temporarytext.find((item) => item.id === id);
    if (temp) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, todo: temp.text, isEditing: false } : todo
        )
      );
    }
  };

  const back = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
  };

  const DeleteTodo = (id: number) => {
    fetch(`https://dummyjson.com/todos/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.isDeleted) {
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        }
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
          DeleteTodo={DeleteTodo}
        />
      </Box>
    </>
  );
};

export default ListView;
