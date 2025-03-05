import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginView from "./loginView";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

interface data {
  username: string;
  password: string;
}

export const server = setupServer(
  http.post("https://dummyjson.com/user/login", async ({ request }) => {
    const { username, password }: data = (await request.json()) as data;
    if (username === "username" && password === "password123") {
      return HttpResponse.json({
        accessToken: "mocked_token",
        id: "12345",
      });
    } else {
      return HttpResponse.json({ error: "Invalid credentials" });
    }
  })
);

const user = "username";
const pass = "password123";
const wronguser = "badusername";
const wrongpass = "badpassword123";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("successful login stores token", async () => {
  render(
    <BrowserRouter>
      <LoginView />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByTestId("username-input"), {
    target: { value: user },
  });
  fireEvent.change(screen.getByTestId("password-input"), {
    target: { value: pass },
  });

  fireEvent.click(screen.getByTestId("login-button"));

  await waitFor(() => {
    expect(localStorage.getItem("Token")).toBe("mocked_token");
    expect(localStorage.getItem("id")).toBe("12345");
  });

  localStorage.clear();
});

test("failed login shows error message", async () => {
  render(
    <BrowserRouter>
      <LoginView />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByTestId("username-input"), {
    target: { value: wronguser },
  });
  fireEvent.change(screen.getByTestId("password-input"), {
    target: { value: wrongpass },
  });

  fireEvent.click(screen.getByTestId("login-button"));

  await waitFor(() => {
    expect(localStorage.getItem("Token")).toBeNull;
    expect(localStorage.getItem("id")).toBeNull;
  });

  screen.findByText("Invalid credentials");
});
