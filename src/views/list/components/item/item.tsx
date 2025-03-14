import { Button, IconButton, TextField, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Todo = {
  _id: string;
  todo: string;
  completed: boolean;
  isEditing?: boolean;
};

type TemporaryText = {
  id: string;
  text: string;
};

export type ItemProps = {
  todo: Todo;
  toggleEdit: (id: string) => void;
  temporarytext?: TemporaryText[];
  settemptext: (newArray: TemporaryText[]) => void;
  save: (id: string) => void;
  back: (id: string) => void;
  DeleteTodo: (id: string) => void;
};

const TodoItem = ({
  todo,
  toggleEdit,
  temporarytext = [],
  settemptext,
  save,
  back,
  DeleteTodo,
}: ItemProps) => {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f4f4f4",
        borderRadius: 2,
        boxShadow: 1,
        position: "relative",
        maxWidth: 300,
        minWidth: 100,
        textAlign: "center",
      }}
    >
      {todo.isEditing ? (
        <TextField
          data-testid="editfield"
          variant="filled"
          fullWidth
          multiline
          rows={2}
          value={
            (Array.isArray(temporarytext)
              ? temporarytext.find((item) => item.id === todo._id)?.text
              : undefined) || todo.todo
          }
          sx={{
            minWidth: 300,
            margin: 1,
            marginBottom: 2,
          }}
          onChange={(e) => {
            const tObjectIndex = temporarytext.findIndex(
              (tObject) => tObject.id === todo._id
            );
            const newArray = [...temporarytext];

            if (tObjectIndex === -1) {
              newArray.push({
                id: todo._id,
                text: e.target.value,
              });
            } else {
              newArray[tObjectIndex] = {
                id: todo._id,
                text: e.target.value,
              };
            }
            settemptext(newArray);
          }}
        />
      ) : (
        <p onClick={() => toggleEdit(todo._id)}>{todo.todo}</p>
      )}

      <IconButton
        data-testid="delete"
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
        onClick={() => DeleteTodo(todo._id)}
      >
        <DeleteIcon />
      </IconButton>

      {todo.isEditing && (
        <>
          <Button
            data-testid="save"
            variant="contained"
            style={{
              backgroundColor: "#3f51b5",
              position: "absolute",
              bottom: 10,
              right: 55,
            }}
            onClick={() => save(todo._id)}
          >
            save
          </Button>

          <Button
            data-testid="back"
            variant="outlined"
            style={{
              position: "absolute",
              bottom: 10,
              right: 130,
            }}
            onClick={() => back(todo._id)}
          >
            back
          </Button>
        </>
      )}
    </Box>
  );
};

export default TodoItem;
