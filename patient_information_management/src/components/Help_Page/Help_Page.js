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
                <Accordion.Item eventKey="0">
                    <Accordion.Header><b>How do I create an account?</b></Accordion.Header>
                    <Accordion.Body>
                    You must contact one of the administators directly to create an account. Their contact information can be found at the bottom of this page.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
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
