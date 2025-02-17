import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./header";

describe("header links testing", () => {
  it("header links while logged off", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const home = screen.findByText("Home");
    expect(home).to.exist;
    const about = screen.findByText("About");
    expect(about).to.exist;
    const login = screen.findByText("Login");
    expect(login).to.exist;
    const feedback = screen.findByText("Feedback");
    expect(feedback).to.exist;
    const list = screen.findByText("list");
    expect(list).toBeNull;
  });

  it("header links while logged on", () => {
    localStorage.setItem("Token", "abc");
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const home = screen.findByText("Home");
    expect(home).to.exist;
    const about = screen.findByText("About");
    expect(about).to.exist;
    const login = screen.findByText("Login");
    expect(login).toBeNull;
    const feedback = screen.findByText("Feedback");
    expect(feedback).to.exist;
    const list = screen.findByText("list");
    expect(list).to.exist;

    localStorage.clear();
  });

  it("test nav", async () => {
    localStorage.setItem("Token", "abc");
    localStorage.setItem("id", "123");

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const homeLink = await screen.findByTestId("home-link");
    const aboutLink = await screen.findByTestId("about-link");
    const profileLink = await screen.findByTestId("profile-link");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(profileLink).toHaveAttribute("href", "/users/123");

    const loginLink = screen.queryByTestId("login-link");
    expect(loginLink).toBeNull();
    localStorage.clear();
  });
});
