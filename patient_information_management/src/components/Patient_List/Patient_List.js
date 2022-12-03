import React, {useEffect, useState} from 'react';
import './Patient_List.css';
import Axios from 'axios'
import Button from 'react-bootstrap/cjs/Button.js';
import Card from 'react-bootstrap/cjs/Card.js';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/cjs/Modal.js';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/cjs/Form.js';
import Row from 'react-bootstrap/cjs/Row.js';


var addedPersonData = {}
var updatedPersonData = {}
var accountType = sessionStorage.getItem("accountType")

var volunteer = null;
var nurse = null;
var staff = null;
var doctor = null;

// set up the account type as a bool to determine what is shown
if (accountType === "volunteer")
{
  volunteer = true;
}
else if (accountType === "staff")
{
  staff = true;
}
else if (accountType === "nurse")
{
  nurse = true;
}
else if (accountType === "doctor")
{
  doctor = true;
}

function Patient_List() {

    const [search_results, setSearchResults] = useState([{}]);
    const [highestID, setHighestID] = useState(0);
    const [dataRetrieved, setDataRetrieved] = useState(false);
    const [person, setPerson] = useState({});
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteWarn, setShowDeleteWarn] = useState(false);
    const [showUpdateWarn, setShowUpdateWarn] = useState(false);
    const handleCancel = () => setShow(false);
    const handleCancelView = () => setShowView(false);
    //Navigation functions
    const navigate = useNavigate();

   // hook to close the modal of editing patient-list data and update the data from the database since nothing was updated
    const handleCancelEdit = () =>
    {
      updatedPersonData = {}
      setShowEdit(false);
    }

    // hook to close the patient Search Modal when cancel button is clicked
    const handlePatientSearchModalCancel = () =>{
      setShow2(false);
    }

    const handleShow = (personID) => {
      setShow(true);
    }


    const handleClose2 = () => setShow2(false);

    // once the Search for Patient button is clicked, this renders the modal
    const SearchPatientModalShow = () => {
      setShow2(true);

    }

    // function to close modal button on patient-search modal
    const handleSearchModalCancel = () => setShow2(false);

    function InsertRow(schema, table, headers, values) {
      Axios.post(`http://localhost:8080/api/insertRow/`, {schema: schema, table: table,
      headers: headers, values: values}).then((response)=>{})
      addedPersonData = {}
  }

    function GetHighestPersonID() {
      let url = (`http://localhost:8080/api/getHighestPersonID/?schema=PIMS&table=Patients`)
      Axios.get(url).then((response)=>{
        // this will set the highest id based on the database
          setHighestID(response.data[0]["MAX(personID)"])
      })
  }

    function UpdateData(schema, table, cols_to_update, updated_info, location, personID) {
      if (Object.keys(updatedPersonData).length !== 0)
      {
      Axios.post(`http://localhost:8080/api/updateData/`, {schema: schema, table: table,
      cols_to_update: cols_to_update, updated_info: updated_info, location: location, data: personID}).then((response)=>{})
      }
      updatedPersonData = {}
  }

    function SaveUpdatedDataToPerson()
    {
      let keys = (Object.keys(updatedPersonData))
      UpdateData("PIMS", "Patients", keys, updatedPersonData, "personID", person["personID"])
    }

    function SaveDataToPerson()
    {
      if (Object.keys(addedPersonData).length === 0)
      {
          window.location.reload();
          return
      }

      if (addedPersonData["firstName"] == null ||
          addedPersonData["lastName"] == null)
          {
              window.location.reload();
              return
          }

      addedPersonData["personID"] = highestID + 1

      if (addedPersonData["middleName"] == null)
      {
          addedPersonData["middleName"] = ""
      }

      let keys = (Object.keys(addedPersonData))
      let values = (Object.values(addedPersonData))
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
      //window.location.reload();
    }

    function RemoveRow(schema, table, location, data) {
      Axios.post(`http://localhost:8080/api/removeRow/`, {schema: schema, table: table,
      location: location, data: data}).then((response)=>{})
    }

    function handleHideSave()
    {
      addedPersonData = {}
      setShowSave(false);
    }

    const [showWarn, setShowWarn] = useState(false);

    // const handleShowWarn = () => {
    //   setShow(false);
    //   setShowWarn(true);
    // }

    const handleDeleteWarn = () => {
      setShowEdit(false);
      setShowDeleteWarn(true);
    }
    const handleUpdateWarn = () => {
      setShowEdit(false);
      setShowUpdateWarn(true);
    }
    const handleHideDeleteWarn = () => {
      setShowDeleteWarn(false);
    }
    const handleHideUpdateWarn = () => {
      setShowUpdateWarn(false);
    }
    const handleHideUpdateWarnWithUpdate = () => {
      SaveUpdatedDataToPerson()
      setShowUpdateWarn(false);
      window.location.reload();
    }
    const handleHideAddWarn = () => {
      SaveDataToPerson()
      handleHideSave(false);
      window.location.reload();
    }
    const handleDeletePatient = () => {
      RemoveRow("PIMS", "Patients", "personID", person.personID)
      setShowDeleteWarn(false);
      window.location.reload();
    }

    // const handleHideWarn = () => setShowWarn(false);

   const [showSave, setShowSave] = useState(false);

   const handleShowSave = () => {
      setShow(false);
      setShowSave(true);
    }

    const handleHideModal = () => {
      addedPersonData = {}
      setShow(false);
    }

    function OpenViewPatient(personID)
    {
        SetPersonToPatientData("*", "PIMS", "Patients", "personID", personID)
        setShowView(true)
    }

    function OpenEditPatient(personID)
    {
        SetPersonToPatientData("*", "PIMS", "Patients", "personID", personID)
        setShowEdit(true)
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
          <Button class = 'editButton' onClick = {() => OpenEditPatient(personID)} style={{display: volunteer ? 'none' : '?'}}>
              Edit
          </Button>
        )
    }

    function SearchForData(selection, schema, table, location) {
      let information = GetDataFromFields()
      let locations = information[0]
      let data = information[1]
      let people = []

      let url = (`http://localhost:8080/api/searchData/?selection=${selection}&schema=${schema}&table=${table}&locations=${[locations]}&data=${data}`)
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
      })
      setShow2(false);
  }

    function GetDataFromFields()
    {
      let data = []
      let fields = ["FirstName", "MiddleName", "LastName"]
      let locations = ["firstName", "middleName", "lastName"]
      for (let i = 0; i < fields.length; i++)
      {
        data.push(document.getElementById(fields[i]).value)
      }
      return [locations, data]
    }

    function SetPersonToPatientData(selection, schema, table, location, data) {
      let url = (`http://localhost:8080/api/getPatientInformation/?selection=${selection}&schema=${schema}&table=${table}&location=${location}&data=${data}`)
      let patientData = {}
      Axios.get(url).then((response)=>{
        // this will insert the data of the patient
          let data = response.data[0]
          for (let x in data)
          {
            patientData[x] = data[x]
          }
          setPerson(patientData)
      })
  }

      function CreatePatientSearchModal()
      {
        return(
        <>
        <div class="col-sm2">
        <head>
        <a href="/css/style.css"></a>
        </head>
        <Modal class = "col-sm2" show={show2} onHide={handlePatientSearchModalCancel} >
        <Card border="primary" style={{ width: '32rem' }}>
        <Card.Header id="cardHeader2"><h3>Patient Search</h3></Card.Header> 
        <Card.Body>      
        <div data-tip= "Enter First Name">
        <label for="First Name">First Name: &nbsp;</label>
        <input type="text" id="FirstName" name="FirstName"></input>
        </div><br></br>
        <div data-tip="Enter First Name">
        <label for="Last Name">Middle Name: &nbsp; </label>
        <input type="text" id="MiddleName" name="MiddleName"></input><br></br>
        </div><br></br>
        <div data-tip="Enter First Name">
        <label for="Last Name">Last Name: &nbsp;</label>
        <input type="text" id="LastName" name="LastName"></input><br></br>
        </div><br></br>
        <div data-tip="Enter First Name"></div>
        <div>
        <Modal.Footer>
        <Button class = 'modalSearchButton' onClick = {() => SearchForData('*', 'PIMS', 'Patients')}> 
        Search
        </Button>
        <Button variant="secondary" class = 'modalCancelButton' onClick = {handleSearchModalCancel} > 
        Cancel
        </Button>
        </Modal.Footer>
        </div>
        </Card.Body>
        </Card>
        </Modal>
        </div>
        </>   
      )}

      function CreateEditModal()
      {
          return (
            <><><Modal show={showEdit} onHide={handleCancelEdit} size='lg'>
              <Modal.Header closeButton>
                <Modal.Title>Editing {person.firstName} {person.lastName}'s information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                    <Form.Label column sm="3">
                      First Name
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.firstName} onChange={(e) => GetUpdatedDataInfo(e, "firstName")}  />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formMiddleName">
                    <Form.Label column sm="3">
                      Middle Name
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.middleName} onChange={(e) => GetUpdatedDataInfo(e, "middleName")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formLastName">
                    <Form.Label column sm="3">
                      Last Name
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.lastName} onChange={(e) => GetUpdatedDataInfo(e, "lastName")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formGender">
                    <Form.Label column sm="3">
                      Sex
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.sex} onChange={(e) => GetUpdatedDataInfo(e, "sex")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formDOB">
                    <Form.Label column sm="3">
                      Date of Birth
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.dateOfBirth} onChange={(e) => GetUpdatedDataInfo(e, "dateOfBirth")} />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formAddress">
                    <Form.Label column sm="3">
                      Address
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.street} onChange={(e) => GetUpdatedDataInfo(e, "street")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formCity">
                    <Form.Label column sm="3">
                      City
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.city} onChange={(e) => GetUpdatedDataInfo(e, "city")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formState">
                    <Form.Label column sm="3">
                      State
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.state} onChange={(e) => GetUpdatedDataInfo(e, "state")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formZipCode">
                    <Form.Label column sm="3">
                      Zip Code
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.zip} onChange={(e) => GetUpdatedDataInfo(e, "zip")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formHomePhone">
                    <Form.Label column sm="3">
                      Home Phone
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.homePhone} onChange={(e) => GetUpdatedDataInfo(e, "homePhone")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formWorkPhone">
                    <Form.Label column sm="3">
                      Work Phone
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.workPhone} onChange={(e) => GetUpdatedDataInfo(e, "workPhone")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formMobilePhone">
                    <Form.Label column sm="3">
                      Mobile Phone
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.cellPhone} onChange={(e) => GetUpdatedDataInfo(e, "cellPhone")} />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formEmergencyName1">
                    <Form.Label column sm="3">
                      Emergency Contact 1's Name
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.emergencyContact1_name} onChange={(e) => GetUpdatedDataInfo(e, "emergencyContact1_name")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone1">
                    <Form.Label column sm="3">
                      Emergency Contact 1's Phone Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.emergencyContactPhone_1} onChange={(e) => GetUpdatedDataInfo(e, "emergencyContactPhone_1")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formEmergencyName2">
                    <Form.Label column sm="3">
                      Emergency Contact 2's Name
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.emergencyContact2_name} onChange={(e) => GetUpdatedDataInfo(e, "emergencyContact2_name")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone2">
                    <Form.Label column sm="3">
                      Emergency Contact 2's Phone Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.emergencyContactPhone_2} onChange={(e) => GetUpdatedDataInfo(e, "emergencyContactPhone_2")} />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formDateAdmitted">
                    <Form.Label column sm="3">
                      Date Admitted
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.dateOfAdmittance} onChange={(e) => GetUpdatedDataInfo(e, "dateOfAdmittance")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formTimeAdmitted">
                    <Form.Label column sm="3">
                      Time Admitted
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.timeOfAdmittance} onChange={(e) => GetUpdatedDataInfo(e, "timeOfAdmittance")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formReasonAdmitted">
                    <Form.Label column sm="3">
                      Reason Admitted
                    </Form.Label>
                    <Col>
                      <Form.Control type="textarea" placeholder={person.reason} onChange={(e) => GetUpdatedDataInfo(e, "reason")} />
                    </Col>
                  </Form.Group>
  
  
                  <Form.Group as={Row} className="mb-3" controlId="formFamilyDoctor">
                    <Form.Label column sm="3">
                      Family Doctor
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.familyDoctor} onChange={(e) => GetUpdatedDataInfo(e, "familyDoctor")} />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formFacility">
                    <Form.Label column sm="3">
                      Facility
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.facility} onChange={(e) => GetUpdatedDataInfo(e, "facility")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formFloor">
                    <Form.Label column sm="3">
                      Floor
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.floor} onChange={(e) => GetUpdatedDataInfo(e, "floor")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formRoomNum">
                    <Form.Label column sm="3">
                      Room Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.roomNumber} onChange={(e) => GetUpdatedDataInfo(e, "roomNumber")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formBedNum">
                    <Form.Label column sm="3">
                      Bed Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.bedNumber} onChange={(e) => GetUpdatedDataInfo(e, "bedNumber")} />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formDateDischarged">
                    <Form.Label column sm="3">
                      Date Discharged
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.dateOfDischarge} onChange={(e) => GetUpdatedDataInfo(e, "dateOfDischarge")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formTimeDischarged">
                    <Form.Label column sm="3">
                      Time Discharged
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.timeOfDischarge} onChange={(e) => GetUpdatedDataInfo(e, "timeOfDischarge")} />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formInsuranceCarrier">
                    <Form.Label column sm="3">
                      Insurance Carrier
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.insuranceCarrier} onChange={(e) => GetUpdatedDataInfo(e, "insuranceCarrier")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formInsuranceGrpNumber">
                    <Form.Label column sm="3">
                      Insurance Group Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.insuranceGroupNumber} onChange={(e) => GetUpdatedDataInfo(e, "insuranceGroupNumber")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formInsuranceAccountNumber">
                    <Form.Label column sm="3">
                      Insurance Account Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.insuranceAccountNumber} onChange={(e) => GetUpdatedDataInfo(e, "insuranceAccountNumber")} />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formBillingInformation">
                    <Form.Label column sm="3">
                      Billing Information
                    </Form.Label>
                    <Col>
                      <Form.Control type="textarea" placeholder={person.listOfBillingInfo} onChange={(e) => GetUpdatedDataInfo(e, "listOfBillingInfo")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formAmountPaid">
                    <Form.Label column sm="3">
                      Amount Paid
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.amountPaid} onChange={(e) => GetUpdatedDataInfo(e, "amountPaid")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formAmountOwed">
                    <Form.Label column sm="3">
                      Amount Owed
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.amountOwed} onChange={(e) => GetUpdatedDataInfo(e, "amountOwed")} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formAmountPaidByInsurance">
                    <Form.Label column sm="3">
                      Amount paid by Insurance
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.amountPaidByInsurance} onChange={(e) => GetUpdatedDataInfo(e, "amountPaidByInsurance")} />
                    </Col>
                  </Form.Group>
                  <div style={{display: staff ? 'none' : '?'}}>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formDoctorNotes">
                    <Form.Label column sm="3">
                      Doctor's Notes
                    </Form.Label>
                    <Col>
                      <textarea class="form-control" placeholder={person.drNotes} onChange={(e) => GetUpdatedDataInfo(e, "drNotes")} readOnly={nurse}/>
                    </Col>
                  </Form.Group>
  
                  <Form.Group as={Row} className="mb-3" controlId="formNurseNotes">
                    <Form.Label column sm="3">
                      Nurse's Notes
                    </Form.Label>
                    <Col>
                      <textarea class="form-control" placeholder={person.nursesNotes} onChange={(e) => GetUpdatedDataInfo(e, "nursesNotes")} readOnly={doctor}/>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formScheduledProcedures">
                    <Form.Label column sm="3">
                      Scheduled Procedures
                    </Form.Label>
                    <Col>
                      <textarea class="form-control" placeholder={person.additionalProcedures} onChange={(e) => GetUpdatedDataInfo(e, "additionalProcedures")} />
                    </Col>
                  </Form.Group>
                  </div>
  
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleUpdateWarn}>
                  Update Patient
                </Button>
                <Button variant="danger" onClick={handleDeleteWarn}>
                  Delete Patient
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
              <Modal show={showDeleteWarn} onHide={handleHideDeleteWarn}>
                <Modal.Header warn>
                  <Modal.Title>Are you sure you would like to delete {person.firstName} {person.lastName} from the system?</Modal.Title>
                </Modal.Header>
  
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleHideDeleteWarn}>Cancel</Button>
                  <Button variant="danger" onClick={handleDeletePatient}>Yes</Button>
                </Modal.Footer>
              </Modal></>
              <Modal show={showUpdateWarn} onHide={handleHideUpdateWarn}>
                <Modal.Header warn>
                  <Modal.Title>Are you sure you would like to update {person.firstName} {person.lastName}'s information?</Modal.Title>
                </Modal.Header>
  
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleHideUpdateWarn}>Cancel</Button>
                  <Button variant="primary" onClick={handleHideUpdateWarnWithUpdate}>Yes</Button>
                </Modal.Footer>
              </Modal></>
          )
      }
  
      function CreateViewModal()
      {
          return (
            <div class="col-sm2">
            <Modal class="col-sm2" show={showView} onHide={handleCancelView} size ='lg'>
              <div id="viewModal">
              <Modal.Header closeButton />
              <Modal.Body>
                  <div id="viewModalCard">
                  <Card border="primary" style={{ width: '42rem' }}>
                  <Card.Header id="cardHeader2"><h3>{person.firstName} {person.middleName} {person.lastName}</h3></Card.Header> 
                  <Card.Body>      
                    <td>
                      <tr><b>First Name: </b> {person.firstName}</tr>
                      <tr><b>Middle Name: </b> {person.middleName}</tr>
                      <tr><b>Last Name: </b> {person.lastName}</tr>
                      <tr><b>Sex: </b> {person.sex}</tr>
                      <tr><b>Date of Birth: </b> {person.dateOfBirth} </tr>
                      <hr></hr>
                      <tr><b>Address: </b> {person.street}</tr>
                      <tr><b>City: </b> {person.city}</tr>
                      <tr><b>State: </b> {person.state}</tr>
                      <tr><b>Zip Code: </b> {person.zip}</tr>
                    <div style={{display: volunteer ? 'none' : '?'}}>
                      <tr><b>Home Phone: </b> {person.homePhone}</tr>
                      <tr><b>Work Phone: </b> {person.workPhone}</tr>
                      <tr><b>Mobile Phone: </b> {person.cellPhone}</tr>
                      <hr></hr>
                      <tr><b>Emergency Contact 1's Name: </b> {person.emergencyContact1_name}</tr>
                      <tr><b>Emergency Contact 1's Phone Number: </b> {person.emergencyContactPhone_1}</tr>
                      <tr><b>Emergency Contact 2's Name: </b> {person.emergencyContact2_name}</tr>
                      <tr><b>Emergency Contact 2's Phone Number: </b> {person.emergencyContactPhone_2}</tr>
                      <hr></hr>
                      <tr><b>Date Admitted: </b> {person.dateOfAdmittance}</tr>
                      <tr><b>Time Admitted: </b> {person.timeOfAdmittance}</tr>
                      <tr><b>Reason Admitted: </b> {person.reason}</tr>
                      <tr><b>Family Doctor: </b> {person.familyDoctor}</tr>
                      </div>
                      <hr></hr>
                      <tr><b>Facility: </b> {person.facility}</tr>
                      <tr><b>Floor: </b> {person.floor}</tr>
                      <tr><b>Room Number: </b> {person.roomNumber}</tr>
                      <tr><b>Bed Number: </b> {person.bedNumber}</tr>
                    <div style={{display: volunteer ? 'none' : '?'}}>
                      <hr></hr>
                      <tr><b>Date Discharged: </b> {person.dateOfDischarge}</tr>
                      <tr><b>Time Discharged: </b> {person.timeOfDischarge}</tr>
                      <hr></hr>
                      <tr><b>Insurance Carrier: </b> {person.insuranceCarrier}</tr>
                      <tr><b>Insurance Group Number: </b> {person.insuranceGroupNumber}</tr>
                      <tr><b>Insurance Account Number: </b> {person.insuranceAccountNumber}</tr>
                      <hr></hr>
                      <tr><b>Billing Information: </b> {person.listOfBillingInfo}</tr>
                      <tr><b>Amount Paid: </b> {person.amountPaid}</tr>
                      <tr><b>Amount Owed: </b> {person.amountOwed}</tr>
                      <tr><b>Amount Paid By Insurance: </b> {person.amountPaidByInsurance}</tr>
                      <div style={{display: staff ? 'none' : '?'}}>
                      <hr></hr>
                      <tr><b>Doctor's Notes: </b> {person.drNotes}</tr>
                      <tr><b>Nurse's Notes: </b> {person.nursesNotes}</tr>
                      <tr><b>Scheduled Procedures: </b> {person.additionalProcedures}</tr>
                      </div>
                      </div>
                    </td>
                  </Card.Body>
                  </Card>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => printElement(document.getElementById("viewModalCard"))}>
                    Print
                  </Button>
                  <Button variant="primary" onClick={handleCancelView}>
                    Done
                  </Button>
                </Modal.Footer>
                </div>
            </Modal>
            </div>
  
          )
      }

      function CreateAddPatientModal()
      {
        GetHighestPersonID()
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
                <div style={{display: staff ? 'none' : '?'}}>
                <Form.Group as={Row} className="mb-3" controlId="formDoctorNotes">
                  <Form.Label column sm="3">
                    Doctor's Notes
                  </Form.Label>
                  <Col>
                    <Form.Control type="textarea" onChange={(e) => GetAddedDataInfo(e, "drNotes")} readOnly={nurse || staff}/>
                  </Col>
                </Form.Group>
  
                <Form.Group as={Row} className="mb-3" controlId="formNurseNotes">
                  <Form.Label column sm="3">
                    Nurse's Notes
                  </Form.Label>
                  <Col>
                    <Form.Control type="textarea" onChange={(e) => GetAddedDataInfo(e, "nursesNotes")} readOnly={doctor || staff}/>
                  </Col>
                </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formScheduledProcedures">
                    <Form.Label column sm="3">
                      Scheduled Procedures
                    </Form.Label>
                    <Col>
                      <textarea class="form-control" onChange={(e) => GetAddedDataInfo(e, "additionalProcedures")} />
                    </Col>
                  </Form.Group>
                </div>
  
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleShowSave}>
                Add Patient
              </Button>
              <Button variant="secondary" onClick={handleHideModal}>
                Cancel
              </Button>
            </Modal.Footer>
        </Modal>
  
        <Modal show={showSave} onHide={handleHideSave}>
          <Modal.Header warn>
            <Modal.Title>Are you sure you would like to add a patient?</Modal.Title>
          </Modal.Header>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideSave}>Cancel</Button>
            <Button variant="primary" onClick={handleHideAddWarn}>Yes</Button>
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
  
      function GetUpdatedDataInfo(event, field)
      {
        updatedPersonData[field] = event.target.value
      }

    function printElement(elem) {
        var domClone = elem.cloneNode(true);

        var $printSection = document.getElementById("printSection");

        if (!$printSection) {
            var $printSection = document.createElement("div");
            $printSection.id = "printSection";
            document.body.appendChild($printSection);
        }

        $printSection.innerHTML = "";
        $printSection.appendChild(domClone);
        window.print();
    }
  
  return (
   <>
        <head>
        <a href="/css/style.css"></a>
        </head>
       

          <div id = "addPatient">
            <Button class = 'addPatientButton' onClick = {() => AddNewPatient()} style={{display: volunteer ? 'none' : '?'}}>
                Add new Patient
            </Button>
          </div>
          <div id = "searchForPatient">
            <Button class = 'searchForPatientButton' onClick = {() => SearchPatientModalShow()}>
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
            <td>Sex</td>
            <td>Date Of Birth</td>
          </tr>
          {LoadData()}
        </Card.Body>
        </Card>
        {CreatePatientSearchModal()} {/* create a modal behind the scenes but the hook setShow2 calls to show the modal*/}
        {CreateAddPatientModal()}
        {CreateViewModal()}
        {CreateEditModal()}
        </>

)}

export default Patient_List;
