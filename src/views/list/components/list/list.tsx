import { Grid } from "@mui/material";
import TodoItem from "../item/item";

const TodoList = ({
  todos,
  toggleEdit,
  temporarytext,
  settemptext,
  save,
  back,
  DeleteTodo,
}) => (
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
        key={todo.id}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
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
