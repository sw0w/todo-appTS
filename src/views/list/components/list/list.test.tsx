import { it, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoList from "./list";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { BrowserRouter } from "react-router-dom";
import { TodoListProps } from "./list";

const listProps: TodoListProps = {
  todos: [{ id: 1, todo: "fly a plane", completed: false }],
  toggleEdit: vi.fn(),
  temporarytext: [{ id: 1, text: "aaa" }],
  settemptext: vi.fn(),
  save: vi.fn(),
  back: vi.fn(),
  DeleteTodo: vi.fn(),
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

describe("list tests", () => {
  it("should render the list of todos", () => {
    render(
      <BrowserRouter>
        <TodoList {...listProps} />
      </BrowserRouter>
    );

    screen.findByText("fly a plane");
  });
});
