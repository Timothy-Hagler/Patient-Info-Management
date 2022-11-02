import { useState, useEffect } from "react";
//import Axios from 'axios'.default
import Axios from 'axios'
import React, { Component }  from 'react';
const About_Us = () => {
  useEffect(()=>{
    //Axios.get("http://localhost:8080/api/searchData", {selection: "*", schema: "PIMS", table: "Patients", location: "LastName", data: "Doe"}).then((data)=>{
    Axios.get(`http://localhost:8080/api/searchData/:selection=*`, {selection: "*", schema: "PIMS", table: "Patients", location: "LastName", data: "Doe"}).then((response)=>{
      alert("you searched data")
      console.log("here")
      console.log(response)
    })
   // console.log(data.data)
   // });
    },[])

    function UpdateData(scheme, table, col_to_update, updated_info, location, new_data) {
      Axios.post(`http://localhost:8080/api/updateData/`, {schema: "PIMS", table: "Patients", 
      col_to_update: "LastName", updated_info: "'Smith'", location: "FirstName", data: "John"}).then((response)=>{
        alert("you updated data")
        console.log("here")
      })
  }

    function SearchData(scheme, table, col_to_update, updated_info, location, new_data) {
      console.log("top of searching")
      Axios.get(`http://localhost:8080/api/searchData/?selection=*`, {selection: "*", schema: "PIMS", table: "Patients", location: "LastName", data: "Doe"}).then((response)=>{
        alert("you searched data")
        console.log("here")
        console.log(response)
      })
  }


    Axios.get(`http://localhost:8080/api/test/`).then((response)=>{
      //alert("you liked a post")
      console.log("test")
    })

  return (
    <>
    <div class="container">
        <center><h2><b>About Us</b></h2></center>
        <button className="like_btn" onClick={(() => UpdateData())}>Like</button>
        <button className="search_btn" onClick={(() => SearchData())}>Search</button>
        <div class="row">
        <div class="col-sm">
          <span class="d-md-block bg-info">
          <center><h2>PIMS</h2></center>
          <p>The Patient Information Management System, also known as PIMS, will allow for doctors, nurses, office staff,
             and volunteers to access different levels of patient data based on their job. Doctors can access all patient
             information and write additional notes on each patient. Nurses can access the same information but can only
             view the doctors' notes. Office staff will be able to access and update information about patients such as 
             name, address, and insurance information. Volunteers will be able to help office staff.
          </p>
          </span>
        </div>
        <div class="col-sm">
          <span class="d-md-block bg-info">
          <center><h2>Administrators</h2></center>
          <p>The administrators of this project will need to be contacted in order to create a new user account. If any
            other issues arise, do not hesitate to contact the administrators.
          </p>
          <center>
          <p><b>Benjamin Stone</b>  <center>bas0043@uah.edu</center></p>
          <p><b>Sydney Keller</b>   <center>smk0023@uah.edu</center></p>
          <p><b>Laurel Strelzoff</b> <center>lcs0018@uah.edu</center></p>
          <p><b>Timothy Hagler</b>    <center>trh0030@uah.edu</center></p>
          </center>
          </span>
        </div>
        </div>
    </div>
    </>
  );
};
export default About_Us;