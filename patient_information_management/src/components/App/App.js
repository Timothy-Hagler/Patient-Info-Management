/*
Authors: Timothy Hagler, Sydney Keller, Ben Stone, Laurel Strelzoff
CS 499-01
Senior Design Final Deliverable
Professor Adam Colwell
Fall 2022
*/

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Patient_List from "../Patient_List/Patient_List.js";
import Login from "../Login/Login.js";
import Help_Page from "../Help_Page/Help_Page.js";
import About_Us from "../About_Us/About_Us.js";
import Navbar from "../Navbar/Navbar.js";
import Protected from "./Protected.js";

function App() {
  /*
  This function connects the different components to one another by creating routes for them. This function also imports bootstrap into the root of the project.
  */
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      ></link>
      <script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossOrigin="anonymous"
      ></script>

      {/*This code sets up the routes for each page and assigns their paths*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />{" "}
          {/*This line only renders the login page, unlike the other pages which also render the Navbar.
                                                      This is to reduce the likelihood of a user trying to access a protected route.*/}
          {/*This route is protected by the value in local storage, and it also renders the Navbar.*/}
          <Route
            path="/patient-list"
            element={
              <Protected
                isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
              >
                <div>
                  <Navbar />
                  <Patient_List />
                </div>
              </Protected>
            }
          />
          {/*This route is not protected because it contains information that could be useful to a first-time user.*/}
          <Route
            path="/help-page"
            element={
              <div>
                <Navbar />
                <Help_Page />
              </div>
            }
          />
          {/*This route is protected by the value in local storage, and it also renders the Navbar.*/}
          <Route
            path="/about-us"
            element={
              <Protected
                isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
              >
                <div>
                  <Navbar />
                  <About_Us />
                </div>
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
