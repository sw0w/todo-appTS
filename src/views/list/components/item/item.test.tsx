import TodoItem from "./item";
import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { BrowserRouter } from "react-router-dom";
import TodoList from "../list/list";
import userEvent from "@testing-library/user-event";
import { isEditable } from "@testing-library/user-event/dist/cjs/utils/index.js";

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

describe("list tests", () => {
  it("it should render the item correctly", () => {
    const toggleEdit = vi.fn();
    const settemptext = vi.fn();
    const save = vi.fn();
    const back = vi.fn();
    const DeleteTodo = vi.fn();
    const temporarytext = vi.fn();

    const todo = { id: 1, todo: "fly a plane", completed: false };

    render(
      <BrowserRouter>
        <TodoItem
          todo={todo}
          toggleEdit={toggleEdit}
          temporarytext={temporarytext}
          settemptext={settemptext}
          save={save}
          back={back}
          DeleteTodo={DeleteTodo}
        />
      </BrowserRouter>
    );

    screen.findByText("fly a plane");
  });

  it("should show the editable field and allow editing when clicked on the text", async () => {
    const toggleEdit = vi.fn();
    const settemptext = vi.fn();
    const save = vi.fn();
    const back = vi.fn();
    const DeleteTodo = vi.fn();

    let todo = {
      id: 1,
      todo: "fly a plane",
      completed: false,
      isEditing: true,
    };

    render(
      <BrowserRouter>
        <TodoItem
          todo={todo}
          toggleEdit={toggleEdit}
          temporarytext={[]}
          settemptext={settemptext}
          save={save}
          back={back}
          DeleteTodo={DeleteTodo}
        />
      </BrowserRouter>
    );

    const todotextEditing = screen.getByRole("textbox");
    expect(todotextEditing).toBeInTheDocument();

    await userEvent.clear(todotextEditing);
    await userEvent.type(todotextEditing, "aaaa");

    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);

    expect(settemptext).toHaveBeenCalled();
    expect(save).toHaveBeenCalledWith(todo.id);
  });

  it("should delete a todo", async () => {
    const toggleEdit = vi.fn();
    const settemptext = vi.fn();
    const save = vi.fn();
    const back = vi.fn();
    const DeleteTodo = vi.fn();
    const temporarytext = vi.fn();

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

    let todo = todos[1];
    render(
      <BrowserRouter>
        <TodoItem
          todo={todo}
          toggleEdit={toggleEdit}
          temporarytext={temporarytext}
          settemptext={settemptext}
          save={save}
          back={back}
          DeleteTodo={DeleteTodo}
        />
      </BrowserRouter>
    );

    const deleteButton = screen.getByTestId("delete");
    fireEvent.click(deleteButton);
  });

  it("should test the back button", async () => {
    const toggleEdit = vi.fn();
    const settemptext = vi.fn();
    const save = vi.fn();
    const back = vi.fn();
    const DeleteTodo = vi.fn();
    const temporarytext = vi.fn();

    let todo = {
      id: 1,
      todo: "fly a plane",
      completed: false,
      isEditing: false,
    };

    render(
      <BrowserRouter>
        <TodoItem
          todo={todo}
          toggleEdit={toggleEdit}
          temporarytext={temporarytext}
          settemptext={settemptext}
          save={save}
          back={back}
          DeleteTodo={DeleteTodo}
        />
      </BrowserRouter>
    );

    const todotext = await screen.findByText("fly a plane");

    fireEvent.click(todotext);

    todo = { ...todo, isEditing: true };

    render(
      <BrowserRouter>
        <TodoItem
          todo={todo}
          toggleEdit={toggleEdit}
          temporarytext={temporarytext}
          settemptext={settemptext}
          save={save}
          back={back}
          DeleteTodo={DeleteTodo}
        />
      </BrowserRouter>
    );

    expect(toggleEdit).toBeCalledWith(todo.id);

    const backButton = screen.getByTestId("save");
    fireEvent.click(backButton);
    expect(back).toBeCalled;
  });
});
