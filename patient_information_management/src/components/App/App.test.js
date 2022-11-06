import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import fireEvent from '@testing-library/user-event';

describe('Navigation Bar Tests', () => {

  test('renders nav bar', () => {
    render(<App />);
    const navBar = screen.getByTestId('navBar')
    expect(navBar).toBeInTheDocument();
  });

  test('renders nav bar patient list hyperlink', () => {
    render(<App />);
    const patientList = screen.getByText('Patient List')
    expect(patientList).toBeInTheDocument();
    expect(patientList).toHaveAttribute('href', '/patient-list')
  });

  test('renders nav bar about us hyperlink', () => {
    render(<App />);
    const aboutUs = screen.getByText('About Us')
    expect(aboutUs).toBeInTheDocument();
    expect(aboutUs).toHaveAttribute('href', '/about-us')
  });

  test('renders nav bar help page hyperlink', () => {
    render(<App />);
    const helpPage = screen.getByText('Help')
    expect(helpPage).toBeInTheDocument();
    expect(helpPage).toHaveAttribute('href', '/help-page')
  });
  
  test('renders nav bar login logo hyperlink', () => {
    render(<App />);
    const logo = screen.getByTestId('logo')
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/')
  });
  
});

// tests whether the links render their respective pages
describe('BrowserRouter Tests', () => {

  test('login page renders by default', () => {
    render(<App />);
    const header = screen.getByText('Login');
    const note = screen.getByText('Credentials');
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