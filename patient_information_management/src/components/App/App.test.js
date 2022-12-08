import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import fireEvent from "@testing-library/user-event";

// tests whether the links render their respective pages
describe("BrowserRouter Tests", () => {
  test("login page renders by default", () => {
    render(<App />);
    const header = screen.getByText("Login");
    const note = screen.getByText("Credentials");
    expect(header).toBeInTheDocument();
    expect(note).toBeInTheDocument();
  });

  // Still need to test whether the links render each page
  // I think can be done by making fireEvent click on each link and then testing what renders to see if it's the correct page

  /*
  test('about us renders', () => {
    render(<App />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Credentials')).toBeInTheDocument();

    const aboutUs = screen.getByTestId('aboutUs')

    fireEvent.click(aboutUs);
    expect(screen.getByText('Patient Information Management System')).toBeInTheDocument();

  });
  */
});

/*

  test('help page renders', () => {
    render(<App />);


    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Credentials')).toBeInTheDocument();

    const aboutUs = screen.getByTestId('helpPage')
    person.click(aboutUs);
    expect(screen.getByText('How do I log on to the system?')).toBeInTheDocument();

  });

  test('patient list renders', async () => {
    render(<App />);
    const person = userEvent.setup();

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Credentials')).toBeInTheDocument();

    const aboutUs = screen.getByTestId('patientList')
    person.click(aboutUs);
    expect(screen.getByText('Edit Patient Data Demo')).toBeInTheDocument();

  });
*/
