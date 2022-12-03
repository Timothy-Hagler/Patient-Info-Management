import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Help_Page from "./Help_Page";

beforeAll(() => {
  render(
    <MemoryRouter>
      <Help_Page />
    </MemoryRouter>
  );
});

test("help page rendering test", () => {
  const text = screen.getByText("FAQ");
  expect(text).toBeInTheDocument();
});

describe("Accordion Tests", () => {
  // Test that the accordions are there
  // Test that each accordion shows new text when clicked
});

describe("About Us Button Test", () => {
  // test that the button is there
  // test that the button navigates you to About Us
});
