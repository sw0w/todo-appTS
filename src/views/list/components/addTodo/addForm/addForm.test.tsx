import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "./addForm";

describe("Add Todo Form Tests", () => {
  it("should call handleAddToDo once the button is clicked", async () => {
    const setTask = vi.fn();
    const handleAddToDo = vi.fn();
    const task = "hiii";

    render(
      <TodoForm task={task} setTask={setTask} handleAddToDo={handleAddToDo} />
    );

    const submit = screen.getByTestId("submit");

    await userEvent.click(submit);

    expect(handleAddToDo).toHaveBeenCalledTimes(1);
  });
});
