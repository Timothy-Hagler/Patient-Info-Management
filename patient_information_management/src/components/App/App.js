import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import Patient_Search from '../Patient_Search/Patient_Search.js';
import Patient_List from '../Patient_List/Patient_List.js';
import Login from '../Login/Login.js';
import Help_Page from '../Help_Page/Help_Page.js';
import About_Us from '../About_Us/About_Us.js';
import logo from '../images/PIMS_emblem.png';

function App() {
  return(
    <div className = "app">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>  
        <nav class="navbar navbar-expand-lg">
            <img src={logo} alt="logo" width="32" height="32"></img>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/patient-list">Patient List</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about-us">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/help-page">Help</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/patient-search">Search</a>
                </li>
              </ul>
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar navbar-nav ml-auto">
                <li class="nav-item" id="logOutButton">
                  <a class="nav-link" href="/">Log Out</a>
                </li>
              </ul>
            </div>
          </nav>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/patient-list" element ={<Patient_List />} />
            <Route path="/patient-search" element ={<Patient_Search />} />
            <Route path="/help-page" element ={<Help_Page />} />
            <Route path="/about-us" element ={<About_Us />} />
          </Routes>
        </BrowserRouter>  
    </div>
  );
}

export default App;
