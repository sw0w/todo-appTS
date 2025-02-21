import TodoItem from "./item";
import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { BrowserRouter } from "react-router-dom";
import { ItemProps } from "./item";
import userEvent from "@testing-library/user-event";

const itemProps: ItemProps = {
  toggleEdit: vi.fn(),
  settemptext: vi.fn(),
  save: vi.fn(),
  back: vi.fn(),
  DeleteTodo: vi.fn(),
  temporarytext: [{ id: 1, text: "aaa" }],
  todo: { id: 1, todo: "fly a plane", completed: false, isEditing: false },
};

export const server = setupServer(
  http.get("https://dummyjson.com/todos", async () => {
    return HttpResponse.json({
      todos: [
        { id: 1, todo: "fly a plane", completed: false },
        { id: 2, todo: "ride a motorcycle", completed: true },
        { id: 3, todo: "roll down a mountain", completed: false },
      ],
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("item tests", () => {
  it("it should render the item correctly", () => {
    render(
      <BrowserRouter>
        <TodoItem {...itemProps} />
      </BrowserRouter>
    );

    screen.findByText("fly a plane");
  });

  it("should show the editable field and allow editing when clicked on the text", async () => {
    let todo = {
      id: 1,
      todo: "fly a plane",
      completed: false,
      isEditing: true,
    };

    render(
      <BrowserRouter>
        <TodoItem {...itemProps} todo={todo} temporarytext={[]} />
      </BrowserRouter>
    );

    const todotextEditing = screen.getByRole("textbox");
    expect(todotextEditing).toBeInTheDocument();

    await userEvent.clear(todotextEditing);
    await userEvent.type(todotextEditing, "aaaa");

    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);

    expect(itemProps.settemptext).toHaveBeenCalled();
    expect(itemProps.save).toHaveBeenCalledWith(todo.id);
  });

  it("should delete a todo", async () => {
    let todos = [
      {
        id: 1,
        todo: "fly a plane",
        completed: false,
        isEditing: false,
      },

      {
        id: 2,
        todo: "go to the moon",
        completed: false,
        isEditing: false,
      },
    ];

    render(
      <BrowserRouter>
        <TodoItem {...itemProps} todo={todos[1]} />
      </BrowserRouter>
    );

    const deleteButton = screen.getByTestId("delete");
    fireEvent.click(deleteButton);
  });

  it("should test the back button", async () => {
    render(
      <BrowserRouter>
        <TodoItem {...itemProps} />
      </BrowserRouter>
    );

    const todotext = await screen.findByText("fly a plane");

    fireEvent.click(todotext);

    render(
      <BrowserRouter>
        <TodoItem
          {...itemProps}
          todo={{ ...itemProps.todo, isEditing: true }}
        />
      </BrowserRouter>
    );

    expect(itemProps.toggleEdit).toBeCalledWith(itemProps.todo.id);

    const backButton = screen.getByTestId("save");
    fireEvent.click(backButton);
    expect(itemProps.back).toBeCalled;
  });
});
