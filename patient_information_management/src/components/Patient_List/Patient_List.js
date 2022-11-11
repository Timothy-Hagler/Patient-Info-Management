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


var addedPersonData = {}

function Patient_List() {
    const [search_results, setSearchResults] = useState([{}]);
    const [highestID, setHighestID] = useState(0);
    const [dataRetrieved, setDataRetrieved] = useState(false);

    const [show, setShow] = useState(false);
    const handleCancel = () => setShow(false);
    const [person, setPerson] = useState({});
    const handleShow = (personID) => {
      setShow(true);
    }

    function InsertRow(schema, table, headers, values) {
      Axios.post(`http://localhost:8080/api/insertRow/`, {schema: schema, table: table,
      headers: headers, values: values}).then((response)=>{})
  }

    function GetHighestPersonID() {
      let url = (`http://localhost:8080/api/getHighestPersonID/?schema=PIMS&table=Patients`)
      Axios.get(url).then((response)=>{
        // this will set the highest id based on the database
          setHighestID(response.data[0]["MAX(personID)"])
      })
  }

    function SaveDataToPerson()
    {
      GetHighestPersonID()
      addedPersonData["personID"] = highestID + 1
      let keys = (Object.keys(addedPersonData))

      setPerson(addedPersonData)

      let values = (Object.values(person))
      let dataString = ``

      for (let i = 0; i < values.length; i++)
      {
        dataString = dataString + `'${values[i]}'`
        if (i + 1 < values.length)
        {
          dataString = dataString + `,`
        }
      }

      InsertRow("PIMS", "Patients", keys, dataString)
      setShowSave(false);
    }

    function handleHideSave()
    {
      setShowSave(false);
    }

    const [showWarn, setShowWarn] = useState(false);
    const handleShowWarn = () => {
      setShow(false);
      setShowWarn(true);
    }
    const handleHideWarn = () => setShowWarn(false);

    const [showSave, setShowSave] = useState(false);
    const handleShowSave = () => {
      setShow(false);
      setShowSave(true);
    }


    const navigate = useNavigate();

    function OpenViewPatient(personID)
    {
        console.log("Viewing the patient " + personID)
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


    function CreateAddPatientModal()
    {
      return (
        <>
      <Modal show={show} onHide={handleCancel} size ='lg'>
        <Modal.Header closeButton>
            <Modal.Title>Enter New Patient's Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                <Form.Label column sm="3">
                  First Name
                </Form.Label>
                <Col>
                <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "firstName")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formMiddleName">
                <Form.Label column sm="3">
                  Middle Name
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "middleName")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formLastName">
                <Form.Label column sm="3">
                  Last Name
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "lastName")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGender">
                <Form.Label column sm="3">
                  Sex
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "sex")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formDOB">
                <Form.Label column sm="3">
                  Date of Birth
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "dateOfBirth")}/>
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formAddress">
                <Form.Label column sm="3">
                  Address
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "street")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formCity">
                <Form.Label column sm="3">
                  City
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "city")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formState">
                <Form.Label column sm="3">
                  State
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "state")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formZipCode">
                <Form.Label column sm="3">
                  Zip Code
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "zip")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formHomePhone">
                <Form.Label column sm="3">
                  Home Phone
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "homePhone")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formWorkPhone">
                <Form.Label column sm="3">
                  Work Phone
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "workPhone")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formMobilePhone">
                <Form.Label column sm="3">
                  Mobile Phone
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "cellPhone")}/>
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formEmergencyName1">
                <Form.Label column sm="3">
                  Emergency Contact 1's Name
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "emergencyContact1_name")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone1">
                <Form.Label column sm="3">
                  Emergency Contact 1's Phone Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "emergencyContactPhone_1")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formEmergencyName2">
                <Form.Label column sm="3">
                  Emergency Contact 2's Name
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "emergencyContact2_name")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone2">
                <Form.Label column sm="3">
                  Emergency Contact 2's Phone Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "emergencyContactPhone_2")}/>
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formDateAdmitted">
                <Form.Label column sm="3">
                  Date Admitted
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "dateOfAdmittance")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formTimeAdmitted">
                <Form.Label column sm="3">
                  Time Admitted
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "timeOfAdmittance")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formReasonAdmitted">
                <Form.Label column sm="3">
                  Reason Admitted
                </Form.Label>
                <Col>
                  <Form.Control type="textarea" onChange={(e) => GetAddedDataInfo(e, "reason")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formFamilyDoctor">
                <Form.Label column sm="3">
                  Family Doctor
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "familyDoctor")}/>
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formFacility">
                <Form.Label column sm="3">
                  Facility
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "facility")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formFloor">
                <Form.Label column sm="3">
                  Floor
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "floor")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formRoomNum">
                <Form.Label column sm="3">
                  Room Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "roomNumber")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formBedNum">
                <Form.Label column sm="3">
                  Bed Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "bedNumber")}/>
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formDateDischarged">
                <Form.Label column sm="3">
                  Date Discharged
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "dateOfDischarge")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formTimeDischarged">
                <Form.Label column sm="3">
                  Time Discharged
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "timeOfDischarge")}/>
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formInsuranceCarrier">
                <Form.Label column sm="3">
                  Insurance Carrier
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "insuranceCarrier")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formInsuranceGrpNumber">
                <Form.Label column sm="3">
                  Insurance Group Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "insuranceGroupNumber")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formInsuranceAccountNumber">
                <Form.Label column sm="3">
                  Insurance Account Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "insuranceAccountNumber")}/>
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formBillingInformation">
                <Form.Label column sm="3">
                  Billing Information
                </Form.Label>
                <Col>
                  <Form.Control type="textarea" onChange={(e) => GetAddedDataInfo(e, "listOfBillingInfo")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formAmountPaid">
                <Form.Label column sm="3">
                  Amount Paid
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "amountPaid")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formAmountOwed">
                <Form.Label column sm="3">
                  Amount Owed
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "amountOwed")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formAmountPaidByInsurance">
                <Form.Label column sm="3">
                  Amount paid by Insurance
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "amountPaidByInsurance")}/>
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formDoctorNotes">
                <Form.Label column sm="3">
                  Doctor's Notes
                </Form.Label>
                <Col>
                  <Form.Control type="textarea" onChange={(e) => GetAddedDataInfo(e, "drNotes")}/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formNurseNotes">
                <Form.Label column sm="3">
                  Nurse's Notes
                </Form.Label>
                <Col>
                  <Form.Control type="textarea" onChange={(e) => GetAddedDataInfo(e, "nursesNotes")}/>
                </Col>
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleShowSave}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleShowSave}>
              Cancel
            </Button>
          </Modal.Footer>
      </Modal>

      <Modal show={showSave} onHide={handleHideSave}>
        <Modal.Header warn>
          <Modal.Title>Are you sure you would like to save?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideSave}>Cancel</Button>
          <Button variant="primary" onClick={SaveDataToPerson}>Yes</Button>
        </Modal.Footer>
      </Modal>
      </>
      )
    }

    function AddNewPatient()
    {
      setShow(true)
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

    function GetAddedDataInfo(event, field)
    {
      addedPersonData[field] = event.target.value
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
          <tr id="colLabels">
            <td>First Name</td>
            <td>Middle Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Sex</td>
            <td>Date Of Birth</td>
          </tr>
          {LoadData()}
        </Card.Body>
        </Card>
        {CreateAddPatientModal()}
 
    </>
    );
  }

export default Patient_List;