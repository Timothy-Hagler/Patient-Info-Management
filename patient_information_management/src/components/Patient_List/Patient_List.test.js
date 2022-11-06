import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Patient_List from './Patient_List.js';

beforeAll(() => {
    render(
        <MemoryRouter>
            <Patient_List/>
        </MemoryRouter>);
})

test("Dummy Patient List Test",() => {

})