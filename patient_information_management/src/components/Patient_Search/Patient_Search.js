import React, {useEffect, useState} from 'react';
import './Patient_Search.css';
import Axios from 'axios'
import Button from 'react-bootstrap/cjs/Button.js';
import Modal from 'react-bootstrap/cjs/Modal.js';
import Col from 'react-bootstrap/esm/Col.js';
import Form from 'react-bootstrap/cjs/Form.js';
import Row from 'react-bootstrap/cjs/Row.js';


function Patient_Search() {
    const [show, setShow] = useState(false);
    const [search_results, setSearchResults] = useState([{}]);
    const [person, setPerson] = useState({
    });

    function LoadDataToModal(selection, schema, table, location, data) {
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

    function LoadSearchResults()
    {
          let data = []
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
          </tr>)
          }
          return data
    }


    const handleCancel = () => setShow(false);

    const handleShow = (personID) => {
      LoadDataToModal("*", "PIMS", "Patients", "personID", personID)
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

    {/* Search Button Functionality */
    /* call to render table inside modal when this button is clicked */}
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
      SearchForData("*", "PIMS", "Patients", "lastName", "Smith")
      
    setShow2(true);
    }
    const handleCancel2 = () => setShow2(false);

  return (
   <>
        <head>
        <a href="/css/style.css"></a>
        </head>
       
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
 
      
  <div>
  <Modal show={show2} onHide={handleCancel2}>
      <Modal.Header closeButton>
        <Modal.Title>Patient Search Results for {person2.firstName} {person2.lastName}</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <table>
          <thead>
          <tr>
            {/* These are the columns */}
            <th>First</th>
            <th>Middle</th>
            <th>Last</th> 
            <th>Age</th>
            <th>Sex</th>
            <th>DOB</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {/* These are the rows */}
          {LoadSearchResults()}
          </tbody>
        </table>
        </Modal.Body>
      <Modal.Footer>
      {/* Need to update this to be based on selected patient's personID*/}
      <Button onClick = {() => handleShow(1)}> 
        Edit Patient Data
      </Button>
      </Modal.Footer>
   
  </Modal>
</div> 
     
          <hr></hr>
      
      <Modal show={show} onHide={handleCancel} size ='lg'>
        <Modal.Header closeButton>
            <Modal.Title>Edit {person.firstName} {person.lastName}'s information </Modal.Title>
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

const testModal = [
  {lastName: "Smith", firstName: "John"}
]
//connect to SQL database to search for the patients dependent on the innerHTML string the user entered and is 
// saved on the clicked enter button event 
const patients = [
  {name: 'Syd'},
  {name: 'Hunter'},
  {name: 'Max'}
];


// searchButton.addEventListener("clicked", () => {

// });

// const searchInput = document.querySelector('.input')

// searchInput.addEventListener("input", (e) => {

//   let value  = e.target.value

//   if(value && value.trim().length > 0){
//     value = value.trim().toLowerCase()
//   }else{

//   }


// });

// const clearButton = document.getElementsByElementId('clear')

// clearButton.addEventListener("click", () => { // clears text in box when pressed


// })

export default Patient_Search;