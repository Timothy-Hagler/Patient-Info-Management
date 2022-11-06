import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Help_Page from './Help_Page';

beforeAll(() => {
    render(
        <MemoryRouter>
            <Help_Page/>
        </MemoryRouter>);
})

test("helpPage test",() => {
    const text = screen.getByText('FAQ')
    expect(text).toBeInTheDocument();
})