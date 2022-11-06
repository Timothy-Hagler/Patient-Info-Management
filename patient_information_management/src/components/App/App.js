import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import Patient_List from '../Patient_List/Patient_List.js';
import Login from '../Login/Login.js';
import Help_Page from '../Help_Page/Help_Page.js';
import About_Us from '../About_Us/About_Us.js';
import logo from '../images/PIMS_emblem.png';

function App() {
  return(
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>  

        <BrowserRouter>
        <nav className="navbar navbar-expand-lg" data-testid='navBar'>
            <a className="navbar-brand" href="/" data-testid='logo'><img src={logo} alt="logo" width="32" height="32"></img></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link"  data-testid = 'patientList' href="/patient-list">Patient List</a>
                </li>
                <li className="nav-item" data-testid = 'aboutUs'>
                  <a className="nav-link"  href="/about-us">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"  data-testid = 'helpPage' href="/help-page">Help</a>
                </li>
              </ul>
            </div>
         </nav>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/patient-list" element ={<Patient_List />} />
            <Route path="/help-page" element ={<Help_Page />} />
            <Route path="/about-us" element ={<About_Us />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
