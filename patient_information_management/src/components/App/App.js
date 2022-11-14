import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import Patient_Search from '../Patient_Search/Patient_Search.js';
import Patient_List from '../Patient_List/Patient_List.js';
import Login from '../Login/Login.js';
import Help_Page from '../Help_Page/Help_Page.js';
import About_Us from '../About_Us/About_Us.js';
import logo from '../images/PIMS_emblem.png';
import Navbar from '../Navbar/Navbar.js';

function App() {
  return(
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>  

        <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/patient-list" element ={<div><Navbar /><Patient_List /></div>} />
            <Route path="/help-page" element ={<div><Navbar /><Help_Page /></div>} />
            <Route path="/about-us" element ={<div><Navbar /><About_Us /></div>} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
