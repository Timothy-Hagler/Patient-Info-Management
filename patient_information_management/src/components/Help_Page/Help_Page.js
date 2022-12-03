import React from 'react';
import './Help_Page.css';
import Accordion from 'react-bootstrap/cjs/Accordion.js';
import {Link} from 'react-router-dom';

export default function Help_Page() {
  return(
    <section>
        <h2><b>User Guide</b></h2>
        <br />
        <hr></hr>
        <br />
        <h3>FAQ</h3>
        <section>
                <Accordion defaultActiveKey="#">
                <Accordion.Item eventKey="6">
                    <Accordion.Header><b>How do system administrators add users to the system?</b></Accordion.Header>
                    <Accordion.Body>
                    System Administrators will need to generate a username and password for each user. The information will be stored in the database.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header><b>How do I log on to the system?</b></Accordion.Header>
                    <Accordion.Body>
                    Once you are connected to the VPN and have contacted the Administrator for an account, you will be able to access PIMS. Upon browser navigation to the PIMS Login Page, you will see a box where you can type in your username and password.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><b>How do I search for a patient?</b></Accordion.Header>
                    <Accordion.Body>
                    Once you have logged in correctly from the PIMS Login Page, you will see the “Help” page of the application. In the top left corner of the screen, press “Patient List”. 

                    <br /><br />You will be directed to the “Patient List” page.  You will now see a “Search for Patient” button on the top right of the screen. Click this “Search for Patient” button for the Patient Search modal box to appear.
                    
                    <br /><br />Once the “Search for Patient” button is clicked, a new modal will appear.

                    <br /><br />This is where you will input the Patient’s name. 

                    <br /><br />You can enter  the names for searching in these formats:
                    <br />First Name Only - Lists all patients with the specified first name
                    <br />Last Name Only - Lists all patients with the specified last name
                    <br />Middle Name Only - List all patients with the specified middle name
                    <br />Any combination of all three of these will work as well.

                        <br /><br />Once you type in the information, press the “Search” button at the bottom of the search modal. 

                        <br /><br />The  modal will automatically close and the patients with the matching inputted information will then populate onto the page. You can then view the patient by pressing the“View” button beside the patient’s name.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><b>How do I edit a patient’s information?</b></Accordion.Header>
                    <Accordion.Body>
                    Only certain users will be able to edit information. Office Staff shall be able to view and update any information on a patient not related to medical treatment. Medical Personnel shall be able to view doctors’ treatment notes, prescriptions, and scheduled procedures and enter treatment notes for nurses. Doctors shall be able to enter additional notes on treatment, prescriptions, and scheduled procedures. Volunteers shall have access to the names and locations of patients.
                    <br /><br />Once you search for the patient that you want to edit, press the “edit” button at the right of the  patient’s name. 

                    <br /><br />There will then be a pop-up modal that displays that patient's information. 
                    <br /><br />Once you have inputted the desired changes, press the “Update Patient” button at the bottom of the pop-up modal.

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><b>How do I add a patient to the system?</b></Accordion.Header>
                    <Accordion.Body>
                    Once you login to the PIMS application and navigate to the Patient List page, press the “Add New Patient” button at the top-right of the screen. 

                    <br /><br />A modal will pop up with boxes to fill in with the new patient’s information. 
                    
                    <br /><br />Once you have all the desired information inputted, press the “Add Patient” button at the bottom of the modal to save the changes and add the patient to the database.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><b>How do I delete a patient from the system?</b></Accordion.Header>
                    <Accordion.Body>
                    To delete a patient from the system, search the patient that you desire to delete and press the “Edit” button beside the patient’s name.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header><b>How do I print a patient’s report?</b></Accordion.Header>
                    <Accordion.Body>
                    The user can print a patient’s report by clicking the “Print” button at the bottom of the “View” modal.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="7">
                    <Accordion.Header><b>How do I logout of the application?</b></Accordion.Header>
                    <Accordion.Body>
                    To logout of the PIMS application, press the “Log Out” button in the top right of the screen.
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