import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Patient_List from "../Patient_List/Patient_List.js";
import Login from "../Login/Login.js";
import Help_Page from "../Help_Page/Help_Page.js";
import Navbar from "../Navbar/Navbar.js";
import Protected from "./Protected.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/patients"
          element={
            <Protected isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}>
              <div>
                <Navbar />
                <Patient_List />
              </div>
            </Protected>
          }
        />
        <Route
          path="/help"
          element={
            <Protected isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}>
              <div>
                <Navbar />
                <Help_Page />
              </div>
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
