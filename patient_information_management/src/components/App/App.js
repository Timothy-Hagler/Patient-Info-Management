import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import Patient_List from '../Patient_List/Patient_List';
import Login from '../Login/Login';
import Patient_Information from '../Patient_Information/Patient_Information';
import About_Us from '../About_Us/About_Us';
import logo from '../images/PIMS_emblem.png';


function App() {
  return(
    <div className = "app">
        <h1>Patient Information Management System</h1>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/"><img src={logo} alt="logo" width="32" height="32"></img></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/patient-information">Patient Information<span class="sr-only"></span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/patient-list">Patient List</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/about-us">About Us</a>
                </li>
              </ul>
            </div>
          </nav>
        <BrowserRouter>
          <Routes>   
            <Route path="/" element={<Login />} />
            <Route path="/patient-list" element ={<Patient_List />} />
            <Route path="/patient-information" element ={<Patient_Information />} />
            <Route path="/about-us" element ={<About_Us />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
