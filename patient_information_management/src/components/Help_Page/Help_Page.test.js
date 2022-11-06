import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Help_Page from './Help_Page';

test("Dummy Help Page Test",() => {
    render(
    <MemoryRouter>
        <Help_Page/>
    </MemoryRouter>);
    const text = screen.getByText('FAQ')
    expect(text).toBeInTheDocument();
})