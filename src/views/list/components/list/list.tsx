import { Grid } from "@mui/material";
import TodoItem from "../item/item";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  isEditing?: boolean;
};

type TemporaryText = {
  id: number;
  text: string;
};

export type TodoListProps = {
  todos: Todo[];
  toggleEdit: (id: number) => void;
  temporarytext?: TemporaryText[];
  settemptext: (texts: TemporaryText[]) => void;
  save: (id: number) => void;
  back: (id: number) => void;
  DeleteTodo: (id: number) => void;
};

const TodoList = ({
  todos,
  toggleEdit,
  temporarytext = [],
  settemptext,
  save,
  back,
  DeleteTodo,
}: TodoListProps) => (
  <Grid
    container
    spacing={2}
    sx={{
      padding: 2,
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: "50px",
    }}
  >
    {todos.map((todo) => (
      <Grid
        item
        xs="auto"
        key={todo._id}
        sx={{ position: "relative", display: "flex", justifyContent: "center" }}
      >
        <TodoItem
          todo={todo}
          toggleEdit={toggleEdit}
          temporarytext={temporarytext}
          settemptext={settemptext}
          save={save}
          back={back}
          DeleteTodo={DeleteTodo}
        />
      </Grid>
    ))}
  </Grid>
);

export default TodoList;
