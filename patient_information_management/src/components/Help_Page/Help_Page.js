import React from 'react';
import './Help_Page.css';
import Accordion from 'react-bootstrap/cjs/Accordion.js';
import {Link} from 'react-router-dom';

export default function Help_Page() {
  return(
    <section>
        <h1>User Guide</h1>
        <h3>FAQ</h3>
        <section>
                <Accordion defaultActiveKey="#">
                <Accordion.Item eventKey="5">
                    <Accordion.Header><b>How do I log on to the system?</b></Accordion.Header>
                    <Accordion.Body>
                    Go to the login page by clicking our logo on the top left of the screen. Enter your username and password. Click Login.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><b>How do I create an account?</b></Accordion.Header>
                    <Accordion.Body>
                    You must contact one of the administators directly to create an account. Their contact information can be found at the bottom of this page.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><b>How do I find a patient?</b></Accordion.Header>
                    <Accordion.Body>
                    Go to the Patient Information page. Enter information in the boxes and click Search. The patients who match your search should appear in a table.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><b>How do I edit a patient's information?</b></Accordion.Header>
                    <Accordion.Body>
                    Go to the Patient Information page and search for a patient. A table should appear with all of the patients that match your search. 
                    Select one of the patients in the table by clicking anywhere in that row. A window should appear with boxes to edit patient information. 
                    Click Save Changes once you are done.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><b>How do I delete a patient?</b></Accordion.Header>
                    <Accordion.Body>
                    Go to the Patient Information page and search for a patient. A table should appear with all of the patients that match your search. 
                    Select one of the patients in the table by clicking anywhere in that row. A window should appear with that patient's information. Click Delete Patient.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header><b>How do I add a patient?</b></Accordion.Header>
                    <Accordion.Body>
                    Go to the Patient Information page. Select the Add Patient button. A window will appear where you can fill out that patient's information. Click Submit changes once you are done.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                
            </section>

        <h3>More information</h3>
                <br/><p>For more information on this project, see the About Us page.</p>
                <Link to="/about-us" className="btn btn-primary">About Us</Link>
                <p/><br/>

        <h3>Contact Us</h3>
            <br/><h5 class="card-title">Emails</h5>
            <p class="card-text"><b>Timothy Hagler: </b>trh0030@uah.edu<br/>
            <b>Sydney Keller: </b>smk0023@uah.edu<br/>
            <b>Benjamin Stone: </b>bas0043@uah.edu<br/>
            <b>Laurel Strelzoff: </b>lcs0018@uah.edu<br/></p>
    </section>
  );
}
