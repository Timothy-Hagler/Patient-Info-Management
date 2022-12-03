/*
Authors: Timothy Hagler, Sydney Keller, Ben Stone, Laurel Strelzoff
CS 499-01
Senior Design Final Deliverable
Professor Adam Colwell
Fall 2022
*/

//import required libraries
import React, { useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/cjs/Button.js";
import Card from "react-bootstrap/cjs/Card.js";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Alert from "react-bootstrap/cjs/Alert.js";

export default function Login() {
  //Navigation functions
  const navigate = useNavigate();

  const navigateToHelp = () => {
    navigate("/help-page");
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  const navigateToPatientList = () => {
    navigate("/patient-list");
  };

  const navigateToAboutUs = () => {
    navigate("/about-us");
  };

  //hooks used for username and password
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  //hook used for displaying the alert
  const [setShow] = useState();

  //function to display an alert of incorrect username or password
  function incorrectUsernameOrPassword() {
    //if the showMessage is true display the error
    if (JSON.parse(sessionStorage.getItem("showMessage"))) {
      return (
        <>
          <div>
            {/*Alert (react-bootstrap component)*/}
            <Alert variant="danger" onClose={() => setShow(false)}>
              <Alert.Heading>Incorrect Username or Password</Alert.Heading>
            </Alert>
          </div>
        </>
      );
    }
  }

  //function that loads the username and password from the
  function LoadUsernameAndPassword(selection, schema, table, location, data) {
    let url = `http://localhost:8080/api/getUsernameAndPassword/?selection=${selection}&schema=${schema}&table=${table}&location=${location}&data=${data}`;

    Axios.get(url).then((response) => {
      // this will insert the data of the patient
      let data = response.data[0];

      //if username is incorrect
      if (data == null) {
        //data will not be present if username is incorrect
        sessionStorage.setItem("showMessage", JSON.stringify(true)); // alert will be shown if username is incorrect stringify to store correctly
        window.location.reload(); // reload the page to clear input fields
      }

      //if username AND password is correct
      else if (password === data["password"]) {
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true)); //set isLoggedIn sessionstorage object to true, need to stringify to store correctly
        sessionStorage.setItem("accountType", data["type"]); //set account type in the sessionstorage for displaying different levels of clearance on patient list
        sessionStorage.setItem("showMessage", JSON.stringify(false)); //alert will be set to false because correct credentials were input
        navigateToHelp();
      }

      //if password is incorrect
      else {
        sessionStorage.setItem("showMessage", JSON.stringify(true));
        window.location.reload();
      }
    });
  }

  //calls the function loadUsernameAndPassword when the login button is clicked
  const handleClick = (event) => {
    LoadUsernameAndPassword("*", "Accounts", "Accounts", "username", username);
  };

  //render html the page
  return (
    <>
      <body className="loginBody">
        <div class="container-fluid text-center">
          <div class="row content">
            <div class="col-sm-8 text-left">
              <div className="credentials">
                <form className="loginform">
                  <div className="CardPane">
                    <Card border="primary" className="LoginCard">
                      <Card.Header>Login to PIMS</Card.Header>
                      <Card.Body>
                        {incorrectUsernameOrPassword()}{" "}
                        {/*Show the alert if the username or password is incorrect*/}
                        <label className="username">
                          <p>Username</p>
                        </label>{" "}
                        {/*&nbsp adds a space*/}
                        <input
                          text="text"
                          required
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <br></br>
                        <label className="password">
                          <p>Password&nbsp;&nbsp;</p>
                        </label>
                        {/*&nbsp&nbsp adds 2 spaces*/}
                        <input
                          type="password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>
                        <Button
                          variant="outline-primary"
                          className="loginbutton"
                          onClick={handleClick}
                        >
                          Login
                        </Button>{" "}
                        {/*Add newlines to add 2 spaces above the button*/}
                        <br></br>
                        <br></br>
                        <Card.Title>Credentials</Card.Title>
                        <Card.Text>
                          Please input your username and password given to you
                          by your system administrator
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
      </body>
    </>
  );
}
