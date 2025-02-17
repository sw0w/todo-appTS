import {
  it,
  expect,
  describe,
  vi,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoInput from "./addbutton";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  http.post("https://dummyjson.com/todos/add", async ({ request }) => {
    const data = await request.json();

    return HttpResponse.json({
      todo: data.todo,
      completed: false,
      userId: 5,
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Add Button Tests", () => {
  it("should render the add button", () => {
    render(<TodoInput task="" setTask={vi.fn()} setTodos={vi.fn()} />);

    const addButton = screen.getByTestId("add-btn");
    expect(addButton).toBeInTheDocument();
  });

  it("should toggle the visibility of the input box on click", async () => {
    render(<TodoInput task="" setTask={vi.fn()} setTodos={vi.fn()} />);

    const addButton = screen.getByTestId("add-btn");

    expect(screen.queryByTestId("textbox")).toBeNull();

    await userEvent.click(addButton);
    expect(screen.getByTestId("textbox")).toBeInTheDocument();

    await userEvent.click(addButton);
    expect(screen.queryByTestId("textbox")).toBeNull();
  });
});
