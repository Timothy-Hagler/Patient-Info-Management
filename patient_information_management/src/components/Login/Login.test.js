import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login.js";

beforeAll(() => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});

// tests if the login page is appearing correctly
test("Login page rendering test", () => {
  const header = screen.getByText("Login");
  const note = screen.getByText("Credentials");
  expect(header).toBeInTheDocument();
  expect(note).toBeInTheDocument();
});

test("Login Page API Tests", () => {
  // test that the login button connects to the correct api call
  // do not test whether the login api call is accurate, that is done in sql.test.js
});
