
import { render, screen } from '@testing-library/react';
import App from './App';

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
  
  test('renders nav bar help page hyperlink', () => {
    render(<App />);
    const patientList = screen.getByTestId('logo')
    expect(patientList).toBeInTheDocument();
    expect(patientList).toHaveAttribute('href', '/')
  });
  
});


