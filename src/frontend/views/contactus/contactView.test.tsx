import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactView from "./contactView";
import "@testing-library/jest-dom";

import { BrowserRouter, useLocation } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: "/",
    })),
  };
});

describe("contact us form testing", () => {
  it('show "required" validation if fields are empty', async () => {
    render(
      <BrowserRouter>
        <ContactView />
      </BrowserRouter>
    );

    const submit = screen.getByTestId("submit");
    userEvent.click(submit);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Message is required")).toBeInTheDocument();
  });

  it("show invalid email error", async () => {
    render(
      <BrowserRouter>
        <ContactView />
      </BrowserRouter>
    );

    const emailform = screen.getByLabelText("Email");
    const submit = screen.getByTestId("submit");

    userEvent.type(emailform, "awawwawawa");
    userEvent.click(submit);

    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
  });

  it("should call useLocation", () => {
    render(
      <BrowserRouter>
        <ContactView />
      </BrowserRouter>
    );

    const submit = screen.getByTestId("submit");
    userEvent.click(submit);

    expect(useLocation).toHaveBeenCalled();
  });
});
