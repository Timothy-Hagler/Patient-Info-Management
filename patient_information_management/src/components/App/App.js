import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import Patient_List from '../Patient_List/Patient_List';
import Login from '../Login/Login';
import Patient_Information from '../Patient_Information/Patient_Information';


function App() {
  return(
    <div class = "app">
        <h1>Patient Information Management System</h1>
        <BrowserRouter>
          <Routes>   
            <Route path="/" element={<Login />} />
            <Route path="/patient-list" element ={<Patient_List />} />
            <Route path="/patient-information" element ={<Patient_Information />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
