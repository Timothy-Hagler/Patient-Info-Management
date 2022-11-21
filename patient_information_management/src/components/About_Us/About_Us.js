import { useState, useEffect } from "react";
import Axios from 'axios'
import React, { Component }  from 'react';
import Card from 'react-bootstrap/cjs/Card.js';
import './About_Us.css';
const About_Us = () => {

    function InsertRow(schema, table, headers, values) {
      Axios.post(`http://localhost:8080/api/insertRow/`, {schema: schema, table: table,
      headers: headers, values: values}).then((response)=>{
        alert("you inserted data")
      })
  }

    function RemoveRow(schema, table, location, data) {
      Axios.post(`http://localhost:8080/api/removeRow/`, {schema: schema, table: table,
      location: location, data: data}).then((response)=>{
        alert("you removed data")
      })
  }

    function UpdateData(schema, table, col_to_update, updated_info, location, new_data) {
      Axios.post(`http://localhost:8080/api/updateData/`, {schema: schema, table: table,
      col_to_update: col_to_update, updated_info: updated_info, location: location, data: new_data}).then((response)=>{
        alert("you updated data")
      })
  }


    function ShowPatientList() {
      console.log("top of showing list")
      let url = (`http://localhost:8080/api/patientList/`)
      Axios.get(url).then((response)=>{
        // this will print out all of the patients as json objects
        for (let index in response.data)
        {
          console.log(response.data[index])
        }
      })
  }

  return (
    <section>
    <div class="container">
        <h2><b>About Us</b></h2>
       {/* <button className="update_btn" onClick={(() => UpdateData("PIMS", "Patients", "LastName", "'Smith'", "FirstName", "John"))}>Update Data</button>
        <button className="search_btn" onClick={(() => SearchData("*", "PIMS", "Patients", "LastName", "Do"))}>Search</button>
        <button className="patientList_btn" onClick={(() => ShowPatientList())}>Show Patient List</button>
        <button className="insertRow_btn" onClick={(() => InsertRow("PIMS", "Patients", "PersonID, LastName, FirstName, Address, City", "'6', 'Doe', 'Jane', '901 Explorer Blvd. NW', 'Huntsville'"))}>Insert Row</button>
  <button className="removeRow_btn" onClick={(() => RemoveRow("PIMS", "Patients", "LastName", "Doe"))}>Remove Row</button>
        <br></br>*/}
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
    </section>
  );
};
export default About_Us;