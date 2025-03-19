import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import ProfileView from "./profileView";

beforeEach(() => {
  localStorage.setItem("Token", "mockToken");
  localStorage.setItem("id", "1");

  global.fetch = vi.fn(() =>
    Promise.resolve(
      new Response(
        JSON.stringify({
          id: 1,
          username: "aaaaaaaaa",
          email: "aa@aa.aa",
          image: "https://via.placeholder.com/150",
        }),
        {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
        }
      )
    )
  );
});

test("should render the profile page correctly and display correct data", async () => {
  render(
    <MemoryRouter initialEntries={["/users/1"]}>
      <Routes>
        <Route path="/users/:uid" element={<ProfileView />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByText("aaaaaaaaa")).toBeInTheDocument()
  );
  const logoutButton = screen.getByText("Logout");

  fireEvent.click(logoutButton);

  localStorage.clear();
});
