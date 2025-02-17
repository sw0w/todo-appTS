import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProfileView from "./ProfileView";
import { vi } from "vitest";

beforeEach(() => {
  localStorage.setItem("Token", "mockToken");
  localStorage.setItem("id", "1");

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          username: "aaaaaaaaa",
          email: "aa@aa.aa",
          image: "https://via.placeholder.com/150",
        }),
    })
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
