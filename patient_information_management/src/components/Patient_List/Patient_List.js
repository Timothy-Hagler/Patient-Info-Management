import React, {useEffect, useState} from 'react';
import './Patient_List.css';
import Axios from 'axios'
import Button from 'react-bootstrap/cjs/Button.js';
import Card from 'react-bootstrap/cjs/Card.js';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/cjs/Modal.js';
import Col from 'react-bootstrap/esm/Col.js';
import Form from 'react-bootstrap/cjs/Form.js';
import Row from 'react-bootstrap/cjs/Row.js';



function Patient_List() {
    const [search_results, setSearchResults] = useState([{}]);
    const [dataRetrieved, setDataRetrieved] = useState(false);

    const navigate = useNavigate();

    function OpenViewPatient(personID)
    {
        console.log("Viewing the patient " + personID)
    }

    function AddNewPatient()
    {
      console.log("Adding new patient")
    }

    function GoToSearch()
    {
      console.log("Going to search")
      navigate('/patient-search');
    }

    function OpenEditPatient(personID)
    {
        console.log("Editing the patient " + personID)
    }

    function CreateViewButton(personID)
    {
        return (
          <Button class = 'viewButton' onClick = {() => OpenViewPatient(personID)}>
              View
          </Button>
        )
    }

    function CreateEditButton(personID)
    {
        return (
          <Button class = 'editButton' onClick = {() => OpenEditPatient(personID)}>
              Edit
          </Button>
        )
    }

    function GetPatientsFromDatabase() {
      if (dataRetrieved === false)
        {
          let people = []

          let url = ("http://localhost:8080/api/getFullPatientTable/")
          Axios.get(url).then((response)=>{
            // this will insert the data of each patient reaching the search criteria
              let patients = response.data
              for (let i = 0; i < patients.length; i++)
              {
                let patientData = {}
                for (let info in patients[i])
                {
                    patientData[info] = patients[i][info]
                }
                people.push(patientData)
              }
              setSearchResults(people)
              setDataRetrieved(true)
          })
        }
  }
    function LoadData()
    {
          let data = []

          GetPatientsFromDatabase()

          for (let i = 0; i < search_results.length; i++)
          {
          data.push(<tr>
            {/* entry for patient */}
            <td>{search_results[i].firstName}</td>
            <td>{search_results[i].middleName}</td>
            <td>{search_results[i].lastName}</td>
            <td>{search_results[i].age}</td>
            <td>{search_results[i].sex}</td>
            <td>{search_results[i].dateOfBirth}</td>
            <td>{CreateViewButton(search_results[i].personID)}</td>
            {CreateEditButton(search_results[i].personID)}
            <hr></hr>
          </tr>)
          }
          return data
    }

  return (
   <>
        <head>
        <a href="/css/style.css"></a>
        </head>
       
          <div id = "addPatient">
            <Button class = 'addPatientButton' onClick = {() => AddNewPatient()}>
                Add new Patient
            </Button>
          </div>
          <div id = "searchForPatient">
            <Button class = 'searchForPatientButton' onClick = {() => GoToSearch()}>
                Search for Patient
            </Button>
          </div>
        <Card border="primary" className="PatientListCard">
        <Card.Header id="cardHeader"><h4>Patient List</h4>
        </Card.Header>
        <Card.Body>
          {LoadData()}
        </Card.Body>
        </Card>
 
    </>
    );
  }

export default Patient_List;