import { it, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoList from "./list";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { BrowserRouter } from "react-router-dom";

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
  it("should render the list of todos", () => {
    const toggleEdit = vi.fn();
    const settemptext = vi.fn();
    const save = vi.fn();
    const back = vi.fn();
    const DeleteTodo = vi.fn();
    const temporarytext = vi.fn();

    const todos = [
      { id: 1, todo: "fly a plane", completed: false },
      { id: 2, todo: "ride a motorcycle", completed: true },
      { id: 3, todo: "roll down a mountain", completed: false },
    ];

    render(
      <BrowserRouter>
        <TodoList
          todos={todos}
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
});
