import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About_Us from "./About_Us.js";

beforeAll(() => {
  render(
    <MemoryRouter>
      <About_Us />
    </MemoryRouter>
  );
});

test("About Us page rendering test", () => {
  // Test whether each card is there
  // Test the contents of the card ex. whether PIMS is in card 1 and whether Administrators is in Card 2
});
