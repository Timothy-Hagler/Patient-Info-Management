import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import About_Us from './About_Us.js';

beforeAll(() => {
    render(
        <MemoryRouter>
            <About_Us/>
        </MemoryRouter>);
})

test("aboutUs test",() => {

})