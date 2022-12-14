/*
Authors: Timothy Hagler, Sydney Keller, Ben Stone, Laurel Strelzoff
CS 499-01
Senior Design Final Deliverable
Professor Adam Colwell
Fall 2022
*/

//import libraries
import React, { useState } from "react";
import "./Patient_List.css";
import Axios from "axios";
import Button from "react-bootstrap/cjs/Button.js";
import Card from "react-bootstrap/cjs/Card.js";
import Modal from "react-bootstrap/cjs/Modal.js";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/cjs/Form.js";
import Row from "react-bootstrap/cjs/Row.js";

var addedPersonData = {}; // empty dictionary to hold addedPerson data
var updatedPersonData = {}; // empty dictionary to hold updatedPerson data
var accountType = sessionStorage.getItem("accountType"); // retrieve sessionStorage to determine account type

// initialize all accounts to null
var volunteer = null;
var nurse = null;
var staff = null;
var doctor = null;

// set up the account type as a bool to determine what is shown
if (accountType === "volunteer") {
  volunteer = true;
} else if (accountType === "staff") {
  staff = true;
} else if (accountType === "nurse") {
  nurse = true;
} else if (accountType === "doctor") {
  doctor = true;
}

/*
  Create a page that will display the patient list. Information will be accessible
  based on the user's account type. There will be a way to view a patient's information,
  search for a patient, update a patient's information, and add a new patient.
*/
function Patient_List() {
  // Create hooks for the page
  const [search_results, setSearchResults] = useState([{}]); // search results hook handles who shows up in patient-list
  const [highestID, setHighestID] = useState(0); // final patient added hook
  const [dataRetrieved, setDataRetrieved] = useState(false); // verifies the data was retrieved from database
  const [person, setPerson] = useState({}); // person hook
  const [show, setShow] = useState(false); // cancel button hook
  const [show2, setShow2] = useState(false); // searchPatientModal show hook
  const [showView, setShowView] = useState(false); // view information modal hook
  const [showEdit, setShowEdit] = useState(false); // show edit modal hook
  const [showDeleteWarn, setShowDeleteWarn] = useState(false); // delete warning hook
  const [showUpdateWarn, setShowUpdateWarn] = useState(false); // update warning hook

  // Create events to handle different button presses
  const handleCancel = () => setShow(false);
  const handleCancelView = () => setShowView(false);

  // hook to close the modal of editing patient-list data and update the data from the database since nothing was updated
  const handleCancelEdit = () => {
    updatedPersonData = {};
    setShowEdit(false);
  };

  // hook to close the patient Search Modal when cancel button is clicked
  const handlePatientSearchModalCancel = () => {
    setShow2(false);
  };

  // once the Search for Patient button is clicked, this renders the modal
  const SearchPatientModalShow = () => {
    setShow2(true);
  };

  // function to close modal button on patient-search modal
  const handleSearchModalCancel = () => setShow2(false);

  // Function to open the add patient modal
  function AddNewPatient() {
    setShow(true);
  }

  // Insert a row into the database based on the user input
  function InsertRow(schema, table, headers, values) {
    Axios.post(`http://localhost:8080/api/insertRow/`, {
      schema: schema,
      table: table,
      headers: headers,
      values: values,
    }).then((response) => { });
    addedPersonData = {};
  }

  // Get the highest ID of the last person in the database and set it to the hook
  function GetHighestPersonID() {
    let url = `http://localhost:8080/api/getHighestPersonID/?schema=PIMS&table=Patients`;
    Axios.get(url).then((response) => {
      setHighestID(response.data[0]["MAX(personID)"]);
    });
  }

  // Update data in the database based on what a user change in the edit modal
  function UpdateData(
    schema,
    table,
    cols_to_update,
    updated_info,
    location,
    personID
  ) {
    if (Object.keys(updatedPersonData).length !== 0) {
      Axios.post(`http://localhost:8080/api/updateData/`, {
        schema: schema,
        table: table,
        cols_to_update: cols_to_update,
        updated_info: updated_info,
        location: location,
        data: personID,
      }).then((response) => { });
    }
    updatedPersonData = {};
  }

  // Get the keys of the changed data then update the data
  function SaveUpdatedDataToPerson() {
    let keys = Object.keys(updatedPersonData);
    UpdateData(
      "PIMS",
      "Patients",
      keys,
      updatedPersonData,
      "personID",
      person["personID"]
    );
  }

  // Save data to a person in the database when adding a new patient
  function SaveDataToPerson() {
    // Ensure there was data input
    if (Object.keys(addedPersonData).length === 0) {
      window.location.reload();
      return;
    }

    // Ensure the patient has a first and last name input
    if (
      addedPersonData["firstName"] == null ||
      addedPersonData["lastName"] == null
    ) {
      window.location.reload();
      return;
    }

    // Set the new patient's ID to the highest ID + 1
    addedPersonData["personID"] = highestID + 1;

    // Make an empty middle name if there is not one. Keeps search functionality from failing
    if (addedPersonData["middleName"] == null) {
      addedPersonData["middleName"] = "";
    }

    let keys = Object.keys(addedPersonData);
    let values = Object.values(addedPersonData);
    let dataString = ``;

    // append each added value to a string in order to add the patient
    for (let i = 0; i < values.length; i++) {
      dataString = dataString + `'${values[i]}'`;
      if (i + 1 < values.length) {
        dataString = dataString + `,`;
      }
    }

    InsertRow("PIMS", "Patients", keys, dataString);
  }

  // Remove a patient from the database
  function RemoveRow(schema, table, location, data) {
    Axios.post(`http://localhost:8080/api/removeRow/`, {
      schema: schema,
      table: table,
      location: location,
      data: data,
    }).then((response) => { });
  }

  // hide the save confirmation modal and reset the addedPersonData
  function handleHideSave() {
    addedPersonData = {};
    setShowSave(false);
  }

  // hide the edit modal and show the confirmation modal
  const handleDeleteWarn = () => {
    setShowEdit(false);
    setShowDeleteWarn(true);
  };

  // hide the edit modal and show the confirmation modal
  const handleUpdateWarn = () => {
    setShowEdit(false);
    setShowUpdateWarn(true);
  };

  // hide the confirmation modal
  const handleHideDeleteWarn = () => {
    setShowDeleteWarn(false);
  };

  // hide the confirmation modal
  const handleHideUpdateWarn = () => {
    setShowUpdateWarn(false);
  };

  // Update the patient's data, hide the modal, reload the page to show the new data
  const handleHideUpdateWarnWithUpdate = () => {
    SaveUpdatedDataToPerson();
    setShowUpdateWarn(false);
    window.location.reload();
  };

  // Add the new patient's data, hide the modal, reload the page to show the new data
  const handleHideAddWarn = () => {
    SaveDataToPerson();
    handleHideSave(false);
    window.location.reload();
  };

  // Delete the patient from the database, hide the modal, reload the page to show changes
  const handleDeletePatient = () => {
    RemoveRow("PIMS", "Patients", "personID", person.personID);
    setShowDeleteWarn(false);
    window.location.reload();
  };

  // hook for showing confirmation of adding a patient
  const [showSave, setShowSave] = useState(false);

  // show confirmation window for adding patient
  const handleShowSave = () => {
    setShow(false);
    setShowSave(true);
  };

  // hide add patient modal and reset the added data
  const handleHideModal = () => {
    addedPersonData = {};
    setShow(false);
  };

  // Open the view patient modal. Patient is based on the given person ID
  function OpenViewPatient(personID) {
    SetPersonToPatientData("*", "PIMS", "Patients", "personID", personID);
    setShowView(true);
  }

  // Open the edit patient modal. Patient is based on the given person ID
  function OpenEditPatient(personID) {
    SetPersonToPatientData("*", "PIMS", "Patients", "personID", personID);
    setShowEdit(true);
  }

  // Create the view button on each patient based on the given person ID
  function CreateViewButton(personID) {
    return (
      <Button class="viewButton" onClick={() => OpenViewPatient(personID)}>
        View
      </Button>
    );
  }

  // Create the edit button on each patient based on the given person ID. Volunteers cannot see this button
  function CreateEditButton(personID) {
    return (
      <Button
        class="editButton"
        onClick={() => OpenEditPatient(personID)}
        style={{ display: volunteer ? "none" : "?" }}
      >
        Edit
      </Button>
    );
  }

  // Search for a patient based on the given information in the search modal
  function SearchForData(selection, schema, table) {
    // Get the locations and data for searching
    let information = GetDataFromFields();
    let locations = information[0];
    let data = information[1];
    let people = [];

    let url = `http://localhost:8080/api/searchData/?selection=${selection}&schema=${schema}&table=${table}&locations=${[
      locations,
    ]}&data=${data}`;

    Axios.get(url).then((response) => {
      let patients = response.data;

      // run through each patient that reaches the search criteria
      for (let i = 0; i < patients.length; i++) {
        let patientData = {};

        // put data for each patient into the patientData dictionary
        for (let info in patients[i]) {
          patientData[info] = patients[i][info];
        }

        // add the person to the overall list
        people.push(patientData);
      }

      // set the search results
      setSearchResults(people);
    });

    // hide the search modal
    setShow2(false);
  }

  // Get the data from the search fields
  function GetDataFromFields() {
    let data = [];
    let fields = ["FirstName", "MiddleName", "LastName"];
    let locations = ["firstName", "middleName", "lastName"];

    // get the data based on the ID of the field
    for (let i = 0; i < fields.length; i++) {
      data.push(document.getElementById(fields[i]).value);
    }

    // return both locations and data for modularity
    return [locations, data];
  }

  // Collect all the patient information and set the person based on that
  function SetPersonToPatientData(selection, schema, table, location, data) {
    let url = `http://localhost:8080/api/getPatientInformation/?selection=${selection}&schema=${schema}&table=${table}&location=${location}&data=${data}`;
    let patientData = {};

    Axios.get(url).then((response) => {
      // this will insert the data of the patient
      let data = response.data[0];
      for (let x in data) {
        patientData[x] = data[x];
      }
      setPerson(patientData);
    });
  }

  // Create the patient search modal
  function CreatePatientSearchModal() {
    return (
      <>
        <div class="col-sm2">
          <Modal
            class="col-sm2"
            show={show2}
            onHide={handlePatientSearchModalCancel}
          >
            <Card border="primary" style={{ width: "32rem" }}>
              <Card.Header id="cardHeader2">
                <h3>Patient Search</h3>
              </Card.Header>
              <Card.Body>
                <div data-tip="Enter First Name">
                  <label for="First Name">First Name: &nbsp;</label>
                  <input type="text" id="FirstName" name="FirstName"></input>
                </div>
                <br></br>
                <div data-tip="Enter First Name">
                  <label for="Last Name">Middle Name: &nbsp; </label>
                  <input type="text" id="MiddleName" name="MiddleName"></input>
                  <br></br>
                </div>
                <br></br>
                <div data-tip="Enter First Name">
                  <label for="Last Name">Last Name: &nbsp;</label>
                  <input type="text" id="LastName" name="LastName"></input>
                  <br></br>
                </div>
                <br></br>
                <div data-tip="Enter First Name"></div>
                <div>
                  <Modal.Footer>
                    <Button
                      class="modalSearchButton"
                      onClick={() => SearchForData("*", "PIMS", "Patients")}
                    >
                      Search
                    </Button>
                    <Button
                      variant="secondary"
                      class="modalCancelButton"
                      onClick={handleSearchModalCancel}
                    >
                      Cancel
                    </Button>
                  </Modal.Footer>
                </div>
              </Card.Body>
            </Card>
          </Modal>
        </div>
      </>
    );
  }

  // Create the edit patient modal
  function CreateEditModal() {
    return (
      <>
        <>
          <Modal show={showEdit} onHide={handleCancelEdit} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>
                Editing {person.firstName} {person.lastName}'s information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                  <Form.Label column sm="3">
                    First Name
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.firstName}
                      onChange={(e) => GetUpdatedDataInfo(e, "firstName")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formMiddleName"
                >
                  <Form.Label column sm="3">
                    Middle Name
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.middleName}
                      onChange={(e) => GetUpdatedDataInfo(e, "middleName")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formLastName">
                  <Form.Label column sm="3">
                    Last Name
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.lastName}
                      onChange={(e) => GetUpdatedDataInfo(e, "lastName")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formGender">
                  <Form.Label column sm="3">
                    Sex
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.sex}
                      onChange={(e) => GetUpdatedDataInfo(e, "sex")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDOB">
                  <Form.Label column sm="3">
                    Date of Birth
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="date"
                      placeholder={person.dateOfBirth}
                      onChange={(e) => GetUpdatedDataInfo(e, "dateOfBirth")}
                    />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formAddress">
                  <Form.Label column sm="3">
                    Address
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.street}
                      onChange={(e) => GetUpdatedDataInfo(e, "street")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formCity">
                  <Form.Label column sm="3">
                    City
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.city}
                      onChange={(e) => GetUpdatedDataInfo(e, "city")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formState">
                  <Form.Label column sm="3">
                    State
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.state}
                      onChange={(e) => GetUpdatedDataInfo(e, "state")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formZipCode">
                  <Form.Label column sm="3">
                    Zip Code
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.zip}
                      onChange={(e) => GetUpdatedDataInfo(e, "zip")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHomePhone">
                  <Form.Label column sm="3">
                    Home Phone
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.homePhone}
                      onChange={(e) => GetUpdatedDataInfo(e, "homePhone")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formWorkPhone">
                  <Form.Label column sm="3">
                    Work Phone
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.workPhone}
                      onChange={(e) => GetUpdatedDataInfo(e, "workPhone")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formMobilePhone"
                >
                  <Form.Label column sm="3">
                    Mobile Phone
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.cellPhone}
                      onChange={(e) => GetUpdatedDataInfo(e, "cellPhone")}
                    />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formEmergencyName1"
                >
                  <Form.Label column sm="3">
                    Emergency Contact 1's Name
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.emergencyContact1_name}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "emergencyContact1_name")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formEmergencyPhone1"
                >
                  <Form.Label column sm="3">
                    Emergency Contact 1's Phone Number
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.emergencyContactPhone_1}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "emergencyContactPhone_1")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formEmergencyName2"
                >
                  <Form.Label column sm="3">
                    Emergency Contact 2's Name
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.emergencyContact2_name}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "emergencyContact2_name")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formEmergencyPhone2"
                >
                  <Form.Label column sm="3">
                    Emergency Contact 2's Phone Number
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.emergencyContactPhone_2}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "emergencyContactPhone_2")
                      }
                    />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formDateAdmitted"
                >
                  <Form.Label column sm="3">
                    Date Admitted
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="date"
                      placeholder={person.dateOfAdmittance}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "dateOfAdmittance")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formTimeAdmitted"
                >
                  <Form.Label column sm="3">
                    Time Admitted
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="time"
                      placeholder={person.timeOfAdmittance}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "timeOfAdmittance")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formReasonAdmitted"
                >
                  <Form.Label column sm="3">
                    Reason Admitted
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="textarea"
                      placeholder={person.reason}
                      onChange={(e) => GetUpdatedDataInfo(e, "reason")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formFamilyDoctor"
                >
                  <Form.Label column sm="3">
                    Family Doctor
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.familyDoctor}
                      onChange={(e) => GetUpdatedDataInfo(e, "familyDoctor")}
                    />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formFacility">
                  <Form.Label column sm="3">
                    Facility
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.facility}
                      onChange={(e) => GetUpdatedDataInfo(e, "facility")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formFloor">
                  <Form.Label column sm="3">
                    Floor
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.floor}
                      onChange={(e) => GetUpdatedDataInfo(e, "floor")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formRoomNum">
                  <Form.Label column sm="3">
                    Room Number
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.roomNumber}
                      onChange={(e) => GetUpdatedDataInfo(e, "roomNumber")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBedNum">
                  <Form.Label column sm="3">
                    Bed Number
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={person.bedNumber}
                      onChange={(e) => GetUpdatedDataInfo(e, "bedNumber")}
                    />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formDateDischarged"
                >
                  <Form.Label column sm="3">
                    Date Discharged
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="date"
                      placeholder={person.dateOfDischarge}
                      onChange={(e) => GetUpdatedDataInfo(e, "dateOfDischarge")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formTimeDischarged"
                >
                  <Form.Label column sm="3">
                    Time Discharged
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="time"
                      placeholder={person.timeOfDischarge}
                      onChange={(e) => GetUpdatedDataInfo(e, "timeOfDischarge")}
                    />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formInsuranceCarrier"
                >
                  <Form.Label column sm="3">
                    Insurance Carrier
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.insuranceCarrier}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "insuranceCarrier")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formInsuranceGrpNumber"
                >
                  <Form.Label column sm="3">
                    Insurance Group Number
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.insuranceGroupNumber}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "insuranceGroupNumber")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formInsuranceAccountNumber"
                >
                  <Form.Label column sm="3">
                    Insurance Account Number
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder={person.insuranceAccountNumber}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "insuranceAccountNumber")
                      }
                    />
                  </Col>
                </Form.Group>
                <hr></hr>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBillingInformation"
                >
                  <Form.Label column sm="3">
                    Billing Information
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="textarea"
                      placeholder={person.listOfBillingInfo}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "listOfBillingInfo")
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formAmountPaid"
                >
                  <Form.Label column sm="3">
                    Amount Paid
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder={person.amountPaid}
                      onChange={(e) => GetUpdatedDataInfo(e, "amountPaid")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formAmountOwed"
                >
                  <Form.Label column sm="3">
                    Amount Owed
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder={person.amountOwed}
                      onChange={(e) => GetUpdatedDataInfo(e, "amountOwed")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formAmountPaidByInsurance"
                >
                  <Form.Label column sm="3">
                    Amount paid by Insurance
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder={person.amountPaidByInsurance}
                      onChange={(e) =>
                        GetUpdatedDataInfo(e, "amountPaidByInsurance")
                      }
                    />
                  </Col>
                </Form.Group>
                <div style={{ display: staff ? "none" : "?" }}>
                  <hr></hr>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formDoctorNotes"
                  >
                    <Form.Label column sm="3">
                      Doctor's Notes
                    </Form.Label>
                    <Col>
                      <textarea
                        class="form-control"
                        placeholder={person.drNotes}
                        onChange={(e) => GetUpdatedDataInfo(e, "drNotes")}
                        readOnly={nurse}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formNurseNotes"
                  >
                    <Form.Label column sm="3">
                      Nurse's Notes
                    </Form.Label>
                    <Col>
                      <textarea
                        class="form-control"
                        placeholder={person.nursesNotes}
                        onChange={(e) => GetUpdatedDataInfo(e, "nursesNotes")}
                        readOnly={doctor}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formScheduledProcedures"
                  >
                    <Form.Label column sm="3">
                      Scheduled Procedures
                    </Form.Label>
                    <Col>
                      <textarea
                        class="form-control"
                        placeholder={person.additionalProcedures}
                        onChange={(e) =>
                          GetUpdatedDataInfo(e, "additionalProcedures")
                        }
                      />
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
              <Modal.Title>
                Are you sure you would like to delete {person.firstName}{" "}
                {person.lastName} from the system?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleHideDeleteWarn}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeletePatient}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <Modal show={showUpdateWarn} onHide={handleHideUpdateWarn}>
          <Modal.Header warn>
            <Modal.Title>
              Are you sure you would like to update {person.firstName}{" "}
              {person.lastName}'s information?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideUpdateWarn}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleHideUpdateWarnWithUpdate}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // Create the view patient modal
  function CreateViewModal() {
    return (
      <div class="col-sm2">
        <Modal
          class="col-sm2"
          show={showView}
          onHide={handleCancelView}
          size="lg"
        >
          <div id="viewModal">
            <Modal.Header closeButton />
            <Modal.Body>
              <div id="viewModalCard">
                <Card border="primary" style={{ width: "42rem" }}>
                  <Card.Header id="cardHeader2">
                    <h3>
                      {person.firstName} {person.middleName} {person.lastName}
                    </h3>
                  </Card.Header>
                  <Card.Body>
                    <td>
                      <tr>
                        <b>First Name: </b> {person.firstName}
                      </tr>
                      <tr>
                        <b>Middle Name: </b> {person.middleName}
                      </tr>
                      <tr>
                        <b>Last Name: </b> {person.lastName}
                      </tr>
                      <tr>
                        <b>Sex: </b> {person.sex}
                      </tr>
                      <tr>
                        <b>Date of Birth: </b> {person.dateOfBirth}{" "}
                      </tr>
                      <hr></hr>
                      <tr>
                        <b>Address: </b> {person.street}
                      </tr>
                      <tr>
                        <b>City: </b> {person.city}
                      </tr>
                      <tr>
                        <b>State: </b> {person.state}
                      </tr>
                      <tr>
                        <b>Zip Code: </b> {person.zip}
                      </tr>
                      <div style={{ display: volunteer ? "none" : "?" }}>
                        <tr>
                          <b>Home Phone: </b> {person.homePhone}
                        </tr>
                        <tr>
                          <b>Work Phone: </b> {person.workPhone}
                        </tr>
                        <tr>
                          <b>Mobile Phone: </b> {person.cellPhone}
                        </tr>
                        <hr></hr>
                        <tr>
                          <b>Emergency Contact 1's Name: </b>{" "}
                          {person.emergencyContact1_name}
                        </tr>
                        <tr>
                          <b>Emergency Contact 1's Phone Number: </b>{" "}
                          {person.emergencyContactPhone_1}
                        </tr>
                        <tr>
                          <b>Emergency Contact 2's Name: </b>{" "}
                          {person.emergencyContact2_name}
                        </tr>
                        <tr>
                          <b>Emergency Contact 2's Phone Number: </b>{" "}
                          {person.emergencyContactPhone_2}
                        </tr>
                        <hr></hr>
                        <tr>
                          <b>Date Admitted: </b> {person.dateOfAdmittance}
                        </tr>
                        <tr>
                          <b>Time Admitted: </b> {person.timeOfAdmittance}
                        </tr>
                        <tr>
                          <b>Reason Admitted: </b> {person.reason}
                        </tr>
                        <tr>
                          <b>Family Doctor: </b> {person.familyDoctor}
                        </tr>
                      </div>
                      <hr></hr>
                      <tr>
                        <b>Facility: </b> {person.facility}
                      </tr>
                      <tr>
                        <b>Floor: </b> {person.floor}
                      </tr>
                      <tr>
                        <b>Room Number: </b> {person.roomNumber}
                      </tr>
                      <tr>
                        <b>Bed Number: </b> {person.bedNumber}
                      </tr>
                      <div style={{ display: volunteer ? "none" : "?" }}>
                        <hr></hr>
                        <tr>
                          <b>Date Discharged: </b> {person.dateOfDischarge}
                        </tr>
                        <tr>
                          <b>Time Discharged: </b> {person.timeOfDischarge}
                        </tr>
                        <hr></hr>
                        <tr>
                          <b>Insurance Carrier: </b> {person.insuranceCarrier}
                        </tr>
                        <tr>
                          <b>Insurance Group Number: </b>{" "}
                          {person.insuranceGroupNumber}
                        </tr>
                        <tr>
                          <b>Insurance Account Number: </b>{" "}
                          {person.insuranceAccountNumber}
                        </tr>
                        <hr></hr>
                        <tr>
                          <b>Billing Information: </b>{" "}
                          {person.listOfBillingInfo}
                        </tr>
                        <tr>
                          <b>Amount Paid: </b> {person.amountPaid}
                        </tr>
                        <tr>
                          <b>Amount Owed: </b> {person.amountOwed}
                        </tr>
                        <tr>
                          <b>Amount Paid By Insurance: </b>{" "}
                          {person.amountPaidByInsurance}
                        </tr>
                        <div style={{ display: staff ? "none" : "?" }}>
                          <hr></hr>
                          <tr>
                            <b>Doctor's Notes: </b> {person.drNotes}
                          </tr>
                          <tr>
                            <b>Nurse's Notes: </b> {person.nursesNotes}
                          </tr>
                          <tr>
                            <b>Scheduled Procedures: </b>{" "}
                            {person.additionalProcedures}
                          </tr>
                        </div>
                      </div>
                    </td>
                  </Card.Body>
                </Card>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() =>
                  printElement(document.getElementById("viewModalCard"))
                }
              >
                Print
              </Button>
              <Button variant="primary" onClick={handleCancelView}>
                Done
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }

  // Create the add patient modal
  function CreateAddPatientModal() {
    GetHighestPersonID();
    return (
      <>
        <Modal show={show} onHide={handleCancel} size="lg">
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
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "firstName")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formMiddleName">
                <Form.Label column sm="3">
                  Middle Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "middleName")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formLastName">
                <Form.Label column sm="3">
                  Last Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "lastName")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGender">
                <Form.Label column sm="3">
                  Sex
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "sex")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formDOB">
                <Form.Label column sm="3">
                  Date of Birth
                </Form.Label>
                <Col>
                  <Form.Control
                    type="date"
                    onChange={(e) => GetAddedDataInfo(e, "dateOfBirth")}
                  />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formAddress">
                <Form.Label column sm="3">
                  Address
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "street")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formCity">
                <Form.Label column sm="3">
                  City
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "city")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formState">
                <Form.Label column sm="3">
                  State
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "state")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formZipCode">
                <Form.Label column sm="3">
                  Zip Code
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    onChange={(e) => GetAddedDataInfo(e, "zip")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formHomePhone">
                <Form.Label column sm="3">
                  Home Phone
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="1234567890"
                    onChange={(e) => GetAddedDataInfo(e, "homePhone")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formWorkPhone">
                <Form.Label column sm="3">
                  Work Phone
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="1234567890"
                    onChange={(e) => GetAddedDataInfo(e, "workPhone")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formMobilePhone">
                <Form.Label column sm="3">
                  Mobile Phone
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="1234567890"
                    onChange={(e) => GetAddedDataInfo(e, "cellPhone")}
                  />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formEmergencyName1"
              >
                <Form.Label column sm="3">
                  Emergency Contact 1's Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) =>
                      GetAddedDataInfo(e, "emergencyContact1_name")
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formEmergencyPhone1"
              >
                <Form.Label column sm="3">
                  Emergency Contact 1's Phone Number
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="1234567890"
                    onChange={(e) =>
                      GetAddedDataInfo(e, "emergencyContactPhone_1")
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formEmergencyName2"
              >
                <Form.Label column sm="3">
                  Emergency Contact 2's Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) =>
                      GetAddedDataInfo(e, "emergencyContact2_name")
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formEmergencyPhone2"
              >
                <Form.Label column sm="3">
                  Emergency Contact 2's Phone Number
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="1234567890"
                    onChange={(e) =>
                      GetAddedDataInfo(e, "emergencyContactPhone_2")
                    }
                  />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formDateAdmitted"
              >
                <Form.Label column sm="3">
                  Date Admitted
                </Form.Label>
                <Col>
                  <Form.Control
                    type="date"
                    onChange={(e) => GetAddedDataInfo(e, "dateOfAdmittance")}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formTimeAdmitted"
              >
                <Form.Label column sm="3">
                  Time Admitted
                </Form.Label>
                <Col>
                  <Form.Control
                    type="time"
                    onChange={(e) => GetAddedDataInfo(e, "timeOfAdmittance")}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formReasonAdmitted"
              >
                <Form.Label column sm="3">
                  Reason Admitted
                </Form.Label>
                <Col>
                  <Form.Control
                    type="textarea"
                    onChange={(e) => GetAddedDataInfo(e, "reason")}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formFamilyDoctor"
              >
                <Form.Label column sm="3">
                  Family Doctor
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "familyDoctor")}
                  />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formFacility">
                <Form.Label column sm="3">
                  Facility
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "facility")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formFloor">
                <Form.Label column sm="3">
                  Floor
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    onChange={(e) => GetAddedDataInfo(e, "floor")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formRoomNum">
                <Form.Label column sm="3">
                  Room Number
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    onChange={(e) => GetAddedDataInfo(e, "roomNumber")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formBedNum">
                <Form.Label column sm="3">
                  Bed Number
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    onChange={(e) => GetAddedDataInfo(e, "bedNumber")}
                  />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formDateDischarged"
              >
                <Form.Label column sm="3">
                  Date Discharged
                </Form.Label>
                <Col>
                  <Form.Control
                    type="date"
                    onChange={(e) => GetAddedDataInfo(e, "dateOfDischarge")}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formTimeDischarged"
              >
                <Form.Label column sm="3">
                  Time Discharged
                </Form.Label>
                <Col>
                  <Form.Control
                    type="time"
                    onChange={(e) => GetAddedDataInfo(e, "timeOfDischarge")}
                  />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formInsuranceCarrier"
              >
                <Form.Label column sm="3">
                  Insurance Carrier
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) => GetAddedDataInfo(e, "insuranceCarrier")}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formInsuranceGrpNumber"
              >
                <Form.Label column sm="3">
                  Insurance Group Number
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) =>
                      GetAddedDataInfo(e, "insuranceGroupNumber")
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formInsuranceAccountNumber"
              >
                <Form.Label column sm="3">
                  Insurance Account Number
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    onChange={(e) =>
                      GetAddedDataInfo(e, "insuranceAccountNumber")
                    }
                  />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formBillingInformation"
              >
                <Form.Label column sm="3">
                  Billing Information
                </Form.Label>
                <Col>
                  <Form.Control
                    type="textarea"
                    onChange={(e) => GetAddedDataInfo(e, "listOfBillingInfo")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formAmountPaid">
                <Form.Label column sm="3">
                  Amount Paid
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    min="0.01"
                    step="0.01"
                    onChange={(e) => GetAddedDataInfo(e, "amountPaid")}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formAmountOwed">
                <Form.Label column sm="3">
                  Amount Owed
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    min="0.01"
                    step="0.01"
                    onChange={(e) => GetAddedDataInfo(e, "amountOwed")}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formAmountPaidByInsurance"
              >
                <Form.Label column sm="3">
                  Amount paid by Insurance
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    min="0.01"
                    step="0.01"
                    onChange={(e) =>
                      GetAddedDataInfo(e, "amountPaidByInsurance")
                    }
                  />
                </Col>
              </Form.Group>
              <hr></hr>
              <div style={{ display: staff ? "none" : "?" }}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formDoctorNotes"
                >
                  <Form.Label column sm="3">
                    Doctor's Notes
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="textarea"
                      onChange={(e) => GetAddedDataInfo(e, "drNotes")}
                      readOnly={nurse || staff}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formNurseNotes"
                >
                  <Form.Label column sm="3">
                    Nurse's Notes
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="textarea"
                      onChange={(e) => GetAddedDataInfo(e, "nursesNotes")}
                      readOnly={doctor || staff}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formScheduledProcedures"
                >
                  <Form.Label column sm="3">
                    Scheduled Procedures
                  </Form.Label>
                  <Col>
                    <textarea
                      class="form-control"
                      onChange={(e) =>
                        GetAddedDataInfo(e, "additionalProcedures")
                      }
                    />
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
            <Modal.Title>
              Are you sure you would like to add a patient?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideSave}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleHideAddWarn}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // This function gets all of the patients stored in the database
  function GetPatientsFromDatabase() {
    if (dataRetrieved === false) {
      let people = [];

      let url = "http://localhost:8080/api/getFullPatientTable/";
      Axios.get(url).then((response) => {
        // This inserts the data of every patient in the database
        let patients = response.data;

        // iterates through the entire database
        for (let i = 0; i < patients.length; i++) {
          let patientData = {};
          for (let info in patients[i]) {
            patientData[info] = patients[i][info];
          }
          people.push(patientData);
        }

        // sets the results of the search and allows the data to be retrieved
        setSearchResults(people);
        setDataRetrieved(true);
      });
    }
  }

  // This function loads data from the database and creates table entries for each person.
  function LoadData() {
    let data = [];

    GetPatientsFromDatabase();

    // Iterates through all patients in the database
    for (let i = 0; i < search_results.length; i++) {
      data.push(
        <tr>
          {/* This is an entry for an individual patient */}
          <td>{search_results[i].firstName}</td>
          <td>{search_results[i].middleName}</td>
          <td>{search_results[i].lastName}</td>
          <td>{search_results[i].sex}</td>
          <td>{search_results[i].dateOfBirth}</td>

          {/*These calls create the view button and edit button corresponding to the person received from the database */}
          <td>{CreateViewButton(search_results[i].personID)}</td>
          {CreateEditButton(search_results[i].personID)}
          <hr></hr>
        </tr>
      );
    }
    return data;
  }

  // This function gets the user's input when adding a patient.
  function GetAddedDataInfo(event, field) {
    addedPersonData[field] = event.target.value;
  }

  // This function gets updated data from the database and renders it
  function GetUpdatedDataInfo(event, field) {
    updatedPersonData[field] = event.target.value;
  }

  /*
  This function generates a clone of the html view card and generates a print call that allows the user to print the view modal card as a report.
  */
  function printElement(elem) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");

    if (!$printSection) {
      var $printSection = document.createElement("div");
      $printSection.id = "printSection";
      document.body.appendChild($printSection);
    }

    // Appends the dom clone to an innerHTML value and generates the browser's default print dialogue
    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
  }

  return (
    <>
      {/*This div initializes the addPatient and searchForPatient buttons */}
      <div className="buttonDiv">
        <div id="addPatient">
          <Button
            class="addPatientButton"
            onClick={() => AddNewPatient()}
            style={{ display: volunteer ? "none" : "?" }}
          >
            Add new Patient
          </Button>
        </div>

        <div id="searchForPatient">
          <Button
            class="searchForPatientButton"
            onClick={() => SearchPatientModalShow()}
          >
            Search for Patient
          </Button>
        </div>
      </div>

      {/*This section contains the card with all of the patient data pulled from the API 
         This data gets rendered in the table initialized here below the header values.*/}
      <section>
        <Card border="primary" className="PatientListCard">
          <Card.Header id="cardHeader">
            <h4>Patient List</h4>
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
      </section>

      {/*These calls generate the html for the modal dialogues, but it keeps them hidden until their corresponding hooks have been called. */}
      {CreatePatientSearchModal()}
      {CreateAddPatientModal()}
      {CreateViewModal()}
      {CreateEditModal()}
    </>
  );
}

export default Patient_List;
