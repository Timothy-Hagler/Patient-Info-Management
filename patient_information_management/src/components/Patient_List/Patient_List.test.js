import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Patient_List from './Patient_List.js';

beforeAll(() => {
    render(
        <MemoryRouter>
            <Patient_List/>
        </MemoryRouter>);
})



describe('Patient List Rendering Tests', () => { 
    // test if we are on the patient page by checking for unique text
    test("Patient List Rendering Test",() => {
        
    })

    // test the appearance of the modal and its dialogues (the extra ones for save and delete patient)
    // test that modal appears when it should (when clicking on a person)
    test("Patient List Modal Test",() => {

        
    })
});


describe('Patient List API Tests', () => { 
    // test that each button in the regular page (not in modal) makes the correct call to the API
    // doesn't test the functionality of the api calls, that will happen in sql.test.js
});

describe('Modal Dialogue API Tests', () => { 
    // test each of the modal buttons to see if they connect to the correct api calls, don't test functionality of api calls here
});