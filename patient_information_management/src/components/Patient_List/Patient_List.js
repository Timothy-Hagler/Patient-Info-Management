import React, {useEffect, useState} from 'react';
import './Patient_List.css';
import Button from 'react-bootstrap/cjs/Button.js';
<<<<<<< Updated upstream
=======
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
import Modal from 'react-bootstrap/cjs/Modal.js';
import Col from 'react-bootstrap/esm/Col.js';
import Form from 'react-bootstrap/cjs/Form.js';
import Row from 'react-bootstrap/cjs/Row.js';
import Card from 'react-bootstrap/cjs/Card.js';

function Patient_List() {
<<<<<<< Updated upstream
    const [show, setShow] = useState(false);
    const [person, setPerson] = useState({
      firstName: '',
      lastName: '',
      address: '',
      city: ''
    });
    const handleCancel = () => setShow(false);

    const handleShow = () => {
      // default person
      // do a mysql call here eventually
      setPerson({firstName: 'John', 
      lastName: 'Smith', 
      address: '601 John Wright Dr', 
      city: 'Huntsville', 
      state: 'AL',
      zip: '35805',
      h_phone: '1234569999',
      w_phone: '1234569998',
      m_phone: '1234569990',
      ec_name_1: 'Jane Smith',
      ec_phone_1: '9998880000',
      ec_name_2: '',
      ec_phone_2: '',
      date_admit: '01/01/2000',
      time_admit: '00:00:00',
      reason_admit: 'Heart Attack',
      family_doctor: 'Adam Smith',
      facility: 'EMERGENCY',
      floor: '1',
      room_number: '102',
      bed_number: '1',
      date_discharged: '',
      time_discharged: '',
      insurance_carrier: '',
      insurance_grp_num: '',
      insurance_account_num: '',
      billing_information: 'ambulance: 10000, resuscitation: 20000',
      amount_paid: '0',
      amount_owed: '30000',
      amount_paid_insurance: '',
      sex: 'M',
      dob: '01/01/1950',
      doctors_notes: 'Prescribed statins, recommended bed rest',
      nurse_notes: '',
    }) // take the data from that mysql call and distribute it into the structure above so the data is displayed correctly
      setShow(true);
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
    const handleHideSave = () => setShowSave(false);
    /* Search Button Functionality */
    /* call to render table inside modal when this button is clicked */
    const [person2, setPerson2] = useState({
      firstName: '',
      lastName: '',
      address: '',
      city: ''
    });
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
       // default person
      // do a mysql call here eventually
      setPerson2({firstName: 'John', 
      lastName: 'Smith', 
      address: '601 John Wright Dr', 
      city: 'Huntsville', 
      state: 'AL',
      zip: '35805',
      h_phone: '1234569999',
      w_phone: '1234569998',
      m_phone: '1234569990',
      ec_name_1: 'Jane Smith',
      ec_phone_1: '9998880000',
      ec_name_2: '',
      ec_phone_2: '',
      date_admit: '01/01/2000',
      time_admit: '00:00:00',
      reason_admit: 'Heart Attack',
      family_doctor: 'Adam Smith',
      facility: 'EMERGENCY',
      floor: '1',
      room_number: '102',
      bed_number: '1',
      date_discharged: '',
      time_discharged: '',
      insurance_carrier: '',
      insurance_grp_num: '',
      insurance_account_num: '',
      billing_information: 'ambulance: 10000, resuscitation: 20000',
      amount_paid: '0',
      amount_owed: '30000',
      amount_paid_insurance: '',
      sex: 'M',
      dob: '01/01/1950',
      doctors_notes: 'Prescribed statins, recommended bed rest',
      nurse_notes: '',
    }) // take the data from that mysql call and distribute it into the structure above so the data is displayed correctly
      
     setShow2(true);
=======


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
      addedPersonData["personID"] = highestID + 1

      if (addedPersonData["firstName"] == null)
      {
          addedPersonData["firstName"] = ""
      }

      if (addedPersonData["middleName"] == null)
      {
          addedPersonData["middleName"] = ""
      }

      if (addedPersonData["lastName"] == null)
      {
          addedPersonData["lastName"] = ""
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
      window.location.reload();
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

    const navigate = useNavigate();

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
          <Button class = 'editButton' onClick = {() => OpenEditPatient(personID)}>
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
        console.log("Inside Create Patient Search Modal")
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
                    <Form.Control type="email" placeholder={person.firstName} onChange={(e) => GetUpdatedDataInfo(e, "firstName")} />
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
                    <Form.Control type="email" placeholder={person.emergencyContact1_name} onChange={(e) => GetUpdatedDataInfo(e, "emergencyContact2_name")} />
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
                <hr></hr>
                <Form.Group as={Row} className="mb-3" controlId="formDoctorNotes">
                  <Form.Label column sm="3">
                    Doctor's Notes
                  </Form.Label>
                  <Col>
                    <Form.Control type="textarea" placeholder={person.drNotes} onChange={(e) => GetUpdatedDataInfo(e, "drNotes")} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formNurseNotes">
                  <Form.Label column sm="3">
                    Nurse's Notes
                  </Form.Label>
                  <Col>
                    <Form.Control type="textarea" placeholder={person.nursesNotes} onChange={(e) => GetUpdatedDataInfo(e, "nursesNotes")} />
                  </Col>
                </Form.Group>

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
>>>>>>> Stashed changes
    }
    const handleCancel2 = () => setShow2(false);
  return (
   <>
        <head>
        <a href="/css/style.css"></a>
        </head>
        <body>
       
        <div class="Patient-Search-Box">
        <p class="solid">
        <h1 class = "hg1">Patient Search</h1><br></br>
        
        {/* Insert the search bar here */}
        {/* Add a tool that says they can just enter the first or last name and get results */}
        <div data-tip="Enter First Name">
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
        <div data-tip="Enter First Name">
        <label for="start">Age: &nbsp;</label>
        <input type="text" id="Age" name="Age"></input><br></br>
        </div><br></br>
        <div>
        <label for="dateofbirth">Date Of Birth: &nbsp;</label>
        <input type="date" name="dateofbirth" id="dateofbirth"></input>
        </div><br></br>
       
  
       <div class = "radioButtons" >
        {/* Add radio buttons for male or female or other */}
        <input type="radio" name="sex" value="HTML"></input>
        <label class="radio-label" >Male</label><br></br>
        <input type="radio" name="sex" value="HTML"></input>
        <label class="radio-label" >Female</label><br></br>
        <input type="radio" name="sex" value="HTML"></input>
        <label class="radio-label" >Other</label><br></br>
        </div><br></br>
       <div>
        <Button class = 'searchButton' onClick = {handleShow2}> 
        Search
      </Button>
      </div>
      </p>
      </div>
      </body>
 
      
  <div>
  <Modal show={show2} onHide={handleCancel2}>
      <Modal.Header closeButton>
        <Modal.Title>Patient Search Results for {person2.firstName} {person2.lastName}</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <table>
          <thead>
          <tr>
            {/* This is the columns */}
            <th>Firstname</th>
            <th>Lastname</th> 
            <th>Age</th>
            <th>Sex</th>
            <th>DOB</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {/* This is the rows */}
          <tr>
            {/* first entry 3 rows */}
            <td>Jill</td>
            <td>Smith</td>
            <td>26</td>
            <td>Female</td>
            <td>04041996</td>
          </tr>
          <tr>
            {/* second entry 3 rows */}
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
            <td>Female</td>
            <td>01181928</td>
          </tr>
          <tr>
            {/* third entry 3 rows */}
            <td>John</td>
            <td>Doe</td>
            <td>24</td>
            <td>Male</td>
            <td>10151998</td>
          </tr>
          </tbody>
        </table>
        </Modal.Body>
      <Modal.Footer>
      <Button onClick = {handleShow}> 
        Edit Patient Data
      </Button>
      </Modal.Footer>
   
  </Modal>
</div> 
     
          <hr></hr>
      
      <Modal show={show} onHide={handleCancel} size ='lg'>
        <Modal.Header closeButton>
            <Modal.Title>Edit {person.firstName} {person.lastName} information </Modal.Title>
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
                  <Form.Control type="email" placeholder={person.dob} />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formAddress">
                <Form.Label column sm="3">
                  Address
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.address} />
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
                  <Form.Control type="email" placeholder={person.h_phone} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formWorkPhone">
                <Form.Label column sm="3">
                  Work Phone
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.w_phone} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formMobilePhone">
                <Form.Label column sm="3">
                  Mobile Phone
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.m_phone} />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formEmergencyName1">
                <Form.Label column sm="3">
                  Emergency Contact 1's Name
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.ec_name_1} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone1">
                <Form.Label column sm="3">
                  Emergency Contact 1's Phone Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.ec_phone_1} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formEmergencyName2">
                <Form.Label column sm="3">
                  Emergency Contact 2's Name
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.ec_name_2} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone2">
                <Form.Label column sm="3">
                  Emergency Contact 2's Phone Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.ec_phone_2} />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formDateAdmitted">
                <Form.Label column sm="3">
                  Date Admitted
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.date_admit} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formTimeAdmitted">
                <Form.Label column sm="3">
                  Time Admitted
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.time_admit} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formReasonAdmitted">
                <Form.Label column sm="3">
                  Reason Admitted
                </Form.Label>
                <Col>
                  <Form.Control type="textarea" placeholder={person.reason_admit} />
                </Col>
              </Form.Group>
              
              <Form.Group as={Row} className="mb-3" controlId="formFamilyDoctor">
                <Form.Label column sm="3">
                  Family Doctor
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.family_doctor} />
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
                  <Form.Control type="email" placeholder={person.room_number} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formBedNum">
                <Form.Label column sm="3">
                  Bed Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.bed_number} />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formDateDischarged">
                <Form.Label column sm="3">
                  Date Discharged
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.date_discharged} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formTimeDischarged">
                <Form.Label column sm="3">
                  Time Discharged
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.time_discharged} />
                </Col>
              </Form.Group>

            {/* add procedure information here */}
            {/* make it addable text of json and inside the json has options to type in procedure and type */}
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formProcedureDate">
                <Form.Label column sm="3">
                Date of Procedure
                </Form.Label>
                <Col>
                  <Form.Control type="email" onChange={(e) => GetAddedDataInfo(e, "dateOfProcedure")}/>
                </Col>
              </Form.Group>

              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formInsuranceCarrier">
                <Form.Label column sm="3">
                  Insurance Carrier
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.insurance_carrier} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formInsuranceGrpNumber">
                <Form.Label column sm="3">
                  Insurance Group Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.insurance_grp_num} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formInsuranceAccountNumber">
                <Form.Label column sm="3">
                  Insurance Account Number
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.insurance_account_num} />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formBillingInformation">
                <Form.Label column sm="3">
                  Billing Information
                </Form.Label>
                <Col>
                  <Form.Control type="textarea" placeholder={person.billing_information} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formAmountPaid">
                <Form.Label column sm="3">
                  Amount Paid
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.amount_paid} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formAmountOwed">
                <Form.Label column sm="3">
                  Amount Owed
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.amount_owed} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formAmountPaidByInsurance">
                <Form.Label column sm="3">
                  Amount paid by Insurance
                </Form.Label>
                <Col>
                  <Form.Control type="email" placeholder={person.amount_paid_insurance} />
                </Col>
              </Form.Group>
              <hr></hr>
              <Form.Group as={Row} className="mb-3" controlId="formDoctorNotes">
                <Form.Label column sm="3">
                  Doctor's Notes
                </Form.Label>
                <Col>
                  <Form.Control type="textarea" placeholder={person.doctors_notes} />
                </Col>
              </Form.Group>
<<<<<<< Updated upstream
=======





>>>>>>> Stashed changes
              <Form.Group as={Row} className="mb-3" controlId="formNurseNotes">
                <Form.Label column sm="3">
                  Nurse's Notes
                </Form.Label>
                <Col>
                  <Form.Control type="textarea" placeholder={person.nurse_notes} />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleShowSave}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleShowWarn}>
              Delete Patient
            </Button>
          </Modal.Footer>
      </Modal>
      <Modal show={showWarn} onHide={handleHideWarn}>
        <Modal.Header warn>
          <Modal.Title>Are you sure you would like to delete {person.firstName} {person.lastName} from the system?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideWarn}>Cancel</Button>
          <Button variant="danger" onClick={handleHideWarn}>Yes</Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={showSave} onHide={handleHideSave}>
        <Modal.Header warn>
          <Modal.Title>Are you sure you would like to save?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideSave}>Cancel</Button>
          <Button variant="primary" onClick={handleHideSave}>Yes</Button>
        </Modal.Footer>
      </Modal>
      
      </>
    );
};

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
 
const testModal = [
  {lastName: "Smith", firstName: "John"}
]

export default Patient_List;

