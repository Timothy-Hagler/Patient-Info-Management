import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Login from './Login.js';

beforeAll(() => {
    render(
        <MemoryRouter>
            <Login/>
        </MemoryRouter>);
})

test("Dummy Login Test",() => {
    const header = screen.getByText('Login');
    const note = screen.getByText('Credentials');
    expect(header).toBeInTheDocument();
    expect(note).toBeInTheDocument();
})