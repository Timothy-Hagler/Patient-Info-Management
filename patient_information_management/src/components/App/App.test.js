import { render, screen } from '@testing-library/react';
import {App, LocationDisplay} from './App';
import userEvent from '@testing-library/user-event';

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
    const patientList = screen.getByText('Help')
    expect(patientList).toBeInTheDocument();
    expect(patientList).toHaveAttribute('href', '/help-page')
  });
  
  test('renders nav bar login logo hyperlink', () => {
    render(<App />);
    const patientList = screen.getByTestId('logo')
    expect(patientList).toBeInTheDocument();
    expect(patientList).toHaveAttribute('href', '/')
  });
  
});

describe('BrowserRouter Tests', () => {

  test('login page renders by default', () => {
    render(<App />);
    const header = screen.getByText('Login');
    const note = screen.getByText('Credentials');
    expect(header).toBeInTheDocument();
    expect(note).toBeInTheDocument();
  });

  test('patient list renders',  async () => {
    render(<App />);
    const person = userEvent.setup();

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Credentials')).toBeInTheDocument();

    await person.click(screen.GetByText('Patient List'));

  });

});