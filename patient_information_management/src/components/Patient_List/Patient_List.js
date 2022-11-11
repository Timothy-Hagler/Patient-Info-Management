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
    const [person, setPerson] = useState({});

    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteWarn, setShowDeleteWarn] = useState(false);
    const handleCancel = () => setShow(false);
    const handleCancelView = () => setShowView(false);
    const handleCancelEdit = () => setShowEdit(false);
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
      addedPersonData["personID"] = highestID + 1

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
      setShowSave(false);
      window.location.reload();
    }

    function RemoveRow(schema, table, location, data) {
      Axios.post(`http://localhost:8080/api/removeRow/`, {schema: schema, table: table,
      location: location, data: data}).then((response)=>{})
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
    const handleDeleteWarn = () => {
      setShowEdit(false);
      setShowDeleteWarn(true);
    }
    const handleHideDeleteWarn = () => {
      setShowDeleteWarn(false);
    }
    const handleDeletePatient = () => {
      RemoveRow("PIMS", "Patients", "personID", person.personID)
      setShowDeleteWarn(false);
      window.location.reload();
    }
    const handleHideWarn = () => setShowWarn(false);

    const [showSave, setShowSave] = useState(false);
    const handleShowSave = () => {
      setShow(false);
      setShowSave(true);
    }

    const handleHideModal = () => {
      setShow(false);
    }

    const navigate = useNavigate();

    function OpenViewPatient(personID)
    {
        console.log("Viewing the patient " + personID)
        SetPersonToPatientData("*", "PIMS", "Patients", "personID", personID)
        setShowView(true)
    }

    function GoToSearch()
    {
      console.log("Going to search")
      navigate('/patient-search');
    }

    function OpenEditPatient(personID)
    {
        console.log("Editing the patient " + personID)
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
          <Button class = 'editButton' onClick = {() => OpenEditPatient(personID)}>
              Edit
          </Button>
        )
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

    function CreateEditModal()
    {
        return (
          <><Modal show={showEdit} onHide={handleCancelEdit} size='lg'>
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
                    <Form.Control type="email" placeholder={person.firstName} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formMiddleName">
                  <Form.Label column sm="3">
                    Middle Name
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.middleName} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formLastName">
                  <Form.Label column sm="3">
                    Last Name
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.lastName} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formGender">
                  <Form.Label column sm="3">
                    Sex
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.sex} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDOB">
                  <Form.Label column sm="3">
                    Date of Birth
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.dateOfBirth} />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formAddress">
                  <Form.Label column sm="3">
                    Address
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.street} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formCity">
                  <Form.Label column sm="3">
                    City
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.city} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formState">
                  <Form.Label column sm="3">
                    State
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.state} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formZipCode">
                  <Form.Label column sm="3">
                    Zip Code
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.zip} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHomePhone">
                  <Form.Label column sm="3">
                    Home Phone
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.homePhone} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formWorkPhone">
                  <Form.Label column sm="3">
                    Work Phone
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.workPhone} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formMobilePhone">
                  <Form.Label column sm="3">
                    Mobile Phone
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.cellPhone} />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formEmergencyName1">
                  <Form.Label column sm="3">
                    Emergency Contact 1's Name
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.emergencyContact1_name} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone1">
                  <Form.Label column sm="3">
                    Emergency Contact 1's Phone Number
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.emergencyContactPhone_1} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEmergencyName2">
                  <Form.Label column sm="3">
                    Emergency Contact 2's Name
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.emergencyContact2_name} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone2">
                  <Form.Label column sm="3">
                    Emergency Contact 2's Phone Number
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.emergencyContactPhone_2} />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formDateAdmitted">
                  <Form.Label column sm="3">
                    Date Admitted
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.dateOfAdmittance} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formTimeAdmitted">
                  <Form.Label column sm="3">
                    Time Admitted
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.timeOfAdmittance} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formReasonAdmitted">
                  <Form.Label column sm="3">
                    Reason Admitted
                  </Form.Label>
                  <Col>
                    <Form.Control type="textarea" placeholder={person.reason} />
                  </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" controlId="formFamilyDoctor">
                  <Form.Label column sm="3">
                    Family Doctor
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.familyDoctor} />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formFacility">
                  <Form.Label column sm="3">
                    Facility
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.facility} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formFloor">
                  <Form.Label column sm="3">
                    Floor
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.floor} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formRoomNum">
                  <Form.Label column sm="3">
                    Room Number
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.roomNumber} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBedNum">
                  <Form.Label column sm="3">
                    Bed Number
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.bedNumber} />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formDateDischarged">
                  <Form.Label column sm="3">
                    Date Discharged
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.dateOfDischarge} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formTimeDischarged">
                  <Form.Label column sm="3">
                    Time Discharged
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.timeOfDischarge} />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formInsuranceCarrier">
                  <Form.Label column sm="3">
                    Insurance Carrier
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.insuranceCarrier} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formInsuranceGrpNumber">
                  <Form.Label column sm="3">
                    Insurance Group Number
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.insuranceGroupNumber} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formInsuranceAccountNumber">
                  <Form.Label column sm="3">
                    Insurance Account Number
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.insuranceAccountNumber} />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formBillingInformation">
                  <Form.Label column sm="3">
                    Billing Information
                  </Form.Label>
                  <Col>
                    <Form.Control type="textarea" placeholder={person.listOfBillingInfo} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formAmountPaid">
                  <Form.Label column sm="3">
                    Amount Paid
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.amountPaid} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formAmountOwed">
                  <Form.Label column sm="3">
                    Amount Owed
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.amountOwed} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formAmountPaidByInsurance">
                  <Form.Label column sm="3">
                    Amount paid by Insurance
                  </Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder={person.amountPaidByInsurance} />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formDoctorNotes">
                  <Form.Label column sm="3">
                    Doctor's Notes
                  </Form.Label>
                  <Col>
                    <Form.Control type="textarea" placeholder={person.drNotes} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formNurseNotes">
                  <Form.Label column sm="3">
                    Nurse's Notes
                  </Form.Label>
                  <Col>
                    <Form.Control type="textarea" placeholder={person.nursesNotes} />
                  </Col>
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCancelEdit}>
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
        )
    }

    function CreateViewModal()
    {
        return (
          <Modal show={showView} onHide={handleCancelView} size ='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Viewing {person.firstName} {person.lastName}'s information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                    <Form.Label column sm="3">
                      First Name
                    </Form.Label>
                    <Col>
                    <Form.Control type="email" placeholder={person.firstName} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formMiddleName">
                    <Form.Label column sm="3">
                      Middle Name
                    </Form.Label>
                    <Col>
                    <Form.Control type="email" placeholder={person.middleName} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formLastName">
                    <Form.Label column sm="3">
                      Last Name
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.lastName} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formGender">
                    <Form.Label column sm="3">
                      Sex
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.sex} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formDOB">
                    <Form.Label column sm="3">
                      Date of Birth
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.dateOfBirth} readOnly />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formAddress">
                    <Form.Label column sm="3">
                      Address
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.street} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formCity">
                    <Form.Label column sm="3">
                      City
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.city} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formState">
                    <Form.Label column sm="3">
                      State
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.state} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formZipCode">
                    <Form.Label column sm="3">
                      Zip Code
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.zip} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formHomePhone">
                    <Form.Label column sm="3">
                      Home Phone
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.homePhone} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formWorkPhone">
                    <Form.Label column sm="3">
                      Work Phone
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.workPhone} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formMobilePhone">
                    <Form.Label column sm="3">
                      Mobile Phone
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.cellPhone} readOnly />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formEmergencyName1">
                    <Form.Label column sm="3">
                      Emergency Contact 1's Name
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.emergencyContact1_name} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone1">
                    <Form.Label column sm="3">
                      Emergency Contact 1's Phone Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.emergencyContactPhone_1} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formEmergencyName2">
                    <Form.Label column sm="3">
                      Emergency Contact 2's Name
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.emergencyContact2_name} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone2">
                    <Form.Label column sm="3">
                      Emergency Contact 2's Phone Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.emergencyContactPhone_2} readOnly />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formDateAdmitted">
                    <Form.Label column sm="3">
                      Date Admitted
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.dateOfAdmittance} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formTimeAdmitted">
                    <Form.Label column sm="3">
                      Time Admitted
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.timeOfAdmittance} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formReasonAdmitted">
                    <Form.Label column sm="3">
                      Reason Admitted
                    </Form.Label>
                    <Col>
                      <Form.Control type="textarea" placeholder={person.reason} readOnly />
                    </Col>
                  </Form.Group>

                  
                  <Form.Group as={Row} className="mb-3" controlId="formFamilyDoctor">
                    <Form.Label column sm="3">
                      Family Doctor
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.familyDoctor} readOnly />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formFacility">
                    <Form.Label column sm="3">
                      Facility
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.facility} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formFloor">
                    <Form.Label column sm="3">
                      Floor
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.floor} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formRoomNum">
                    <Form.Label column sm="3">
                      Room Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.roomNumber} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formBedNum">
                    <Form.Label column sm="3">
                      Bed Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.bedNumber} readOnly />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formDateDischarged">
                    <Form.Label column sm="3">
                      Date Discharged
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.dateOfDischarge} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formTimeDischarged">
                    <Form.Label column sm="3">
                      Time Discharged
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.timeOfDischarge} readOnly />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formInsuranceCarrier">
                    <Form.Label column sm="3">
                      Insurance Carrier
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.insuranceCarrier} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formInsuranceGrpNumber">
                    <Form.Label column sm="3">
                      Insurance Group Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.insuranceGroupNumber} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formInsuranceAccountNumber">
                    <Form.Label column sm="3">
                      Insurance Account Number
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.insuranceAccountNumber} readOnly />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formBillingInformation">
                    <Form.Label column sm="3">
                      Billing Information
                    </Form.Label>
                    <Col>
                      <Form.Control type="textarea" placeholder={person.listOfBillingInfo} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formAmountPaid">
                    <Form.Label column sm="3">
                      Amount Paid
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.amountPaid} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formAmountOwed">
                    <Form.Label column sm="3">
                      Amount Owed
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.amountOwed} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formAmountPaidByInsurance">
                    <Form.Label column sm="3">
                      Amount paid by Insurance
                    </Form.Label>
                    <Col>
                      <Form.Control type="email" placeholder={person.amountPaidByInsurance} readOnly />
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} className="mb-3" controlId="formDoctorNotes">
                    <Form.Label column sm="3">
                      Doctor's Notes
                    </Form.Label>
                    <Col>
                      <Form.Control type="textarea" placeholder={person.drNotes} readOnly />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formNurseNotes">
                    <Form.Label column sm="3">
                      Nurse's Notes
                    </Form.Label>
                    <Col>
                      <Form.Control type="textarea" placeholder={person.nursesNotes} readOnly />
                    </Col>
                  </Form.Group>

                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleCancelView}>
                  Done
                </Button>
              </Modal.Footer>
          </Modal>

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
        {CreateViewModal()}
        {CreateEditModal()}
 
    </>
    );
  }

export default Patient_List;