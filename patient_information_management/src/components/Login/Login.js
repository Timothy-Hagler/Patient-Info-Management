import React, { Component, useState } from 'react';
import './Login.css';
import logo from '../images/PIMS_emblem.png';
import Button from 'react-bootstrap/cjs/Button.js';
import Card from 'react-bootstrap/cjs/Card.js';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


//async function required for login-authentication
//to 8080 port where authentication server runs
async function loginUser(credentials) {

  return fetch('http://localhost:8080/api/login', {
 
    method: 'POST',
 
    headers: {
 
      'Content-Type': 'application/json'
 
    },
 
    body: JSON.stringify(credentials)
 
  })
 
    .then(data => data.json())
 
 }

export default function Login({ setToken }) {
  
  //Navigation functions
  const navigate = useNavigate();

  const navigateToHelp = () => {
    navigate('/help-page');
  }

  const navigateToLogin = () => {
    navigate('/');
  }

  const navigateToPatientList = () => {
    navigate('/patient-list');
  }

  const navigateToAboutUs = () => {
    navigate('/about-us');
  }

  const [username, setUserName] = useState();
  
  const [password, setPassword] = useState();

  const [show, setShow] = useState(false); //Used for alert

  const handleSubmit = async e => {

      e.preventDefault();
    
      const token = await loginUser({
    
        username,
    
        password
    
      });
    
      setToken(token);
    }
  
  const handleClick = event => {
    if(username.toLowerCase() === "drhagler".toLowerCase() && password === "password")
    {
      navigateToHelp();
    }
    else{
      window.location.reload();
    }

  }

    return(

    <>
      <div class="container-fluid text-center">
          <div class="row content"> 
            <div class="col-sm-8 text-left">
              <div className = "credentials">
                <form className = "loginform">
                  <div className = "CardPane">  
                    <Card border="primary" className="LoginCard">
                      <Card.Header>Login to PIMS</Card.Header>
                      <Card.Body>
                        <label className = "username"><p>Username</p></label> {/*&nbsp adds a space*/}
                        <input text = "text" required onChange={e => setUserName(e.target.value)}/>
                        <br></br>   
                        <label className = "password"><p>Password&nbsp;&nbsp;</p></label>{/*&nbsp&nbsp adds 2 spaces*/}
                        <input type = "password" required onChange={e => setPassword(e.target.value)}/>
                        <br></br>
                        <Button variant="outline-primary" className = "loginbutton" onClick={handleClick}>Login</Button>{' '}
                        {/*Add newlines to add 2 spaces above the button*/}
                        <br></br>
                        <br></br>
                        <Card.Title>Credentials</Card.Title>
                        <Card.Text>
                          Please input your username and password given to you by your system administrator
                        </Card.Text>    
                      </Card.Body>
                    </Card>
                  </div>
                </form> 
              </div> 
            </div>
          </div>
        </div>
        {/*Create a footer for the bottom of the webpage*/}
        <footer class="container-fluid text-center">
          <p>CS499 Team 3</p>
        </footer>
    </>  
  )


}

Login.propTypes = {
  
  setToken: PropTypes.func.isRequired

};
