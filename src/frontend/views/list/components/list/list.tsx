import { Grid } from "@mui/material";
import TodoItem from "../item/item";
import { Todo, TemporaryText } from "../../../../types/todotype";

export type TodoListProps = {
  todos: Todo[];
  toggleEdit: (_id: string) => void;
  temporarytext?: TemporaryText[];
  settemptext: (texts: TemporaryText[]) => void;
  save: (_id: string) => void;
  back: (_id: string) => void;
  DeleteTodo: (_id: string) => void;
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
