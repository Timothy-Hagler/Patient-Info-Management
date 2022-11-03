import { useState } from "react";
import React, { Component }  from 'react';
import Card from 'react-bootstrap/Card';
import './About_Us.css';
const About_Us = () => {
  return (
    <>
    <div class="container">
        <br></br>
        <h2><b>About Us</b></h2>
        <br></br>
        <hr />
        <br></br>
        <div class="row">
        <div class="col-sm">
          <Card border="primary" className="PIMSCard">
          <Card.Header id="cardHeader"><h4>PIMS</h4></Card.Header>
          <Card.Body>
          <p>
             The Patient Information Management System, also known as PIMS, will allow for doctors, nurses, office staff,
             and volunteers to access different levels of patient data based on their job. Doctors can access all patient
             information and write additional notes on each patient. Nurses can access the same information but can only
             view the doctors' notes. Office staff will be able to access and update information about patients such as 
             name, address, and insurance information. Volunteers will be able to help office staff.
          </p>
          </Card.Body>
          </Card>
        </div>
        <div class="col-sm">
          <Card border="primary" className="AdminCard">
          <Card.Header id="cardHeader"><h4>Administrators</h4></Card.Header>
          <Card.Body>
          <p>
            The administrators of this project will need to be contacted in order to create a new user account. If any
            other issues arise, do not hesitate to contact the administrators.
          </p>
          <p><b>Benjamin Stone</b>  <center>bas0043@uah.edu</center></p>
          <p><b>Sydney Keller</b>   <center>smk0023@uah.edu</center></p>
          <p><b>Laurel Strelzoff</b> <center>lcs0018@uah.edu</center></p>
          <p><b>Timothy Hagler</b>    <center>trh0030@uah.edu</center></p>
          </Card.Body>
          </Card>
        </div>
        </div>
    </div>
    </>
  );
};
export default About_Us;