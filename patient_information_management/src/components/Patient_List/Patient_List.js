import React, {useEffect, useState} from 'react';
import './Patient_List.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Patient_List() {
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

    return (
      
          

     


<>
<div class="modal" tabindex="-1" role="dialog">
   <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Patient Search</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      {/* Insert the search bar here */}
      {/* Add a tool that says they can just enter the first or last name and get results */}

      <label for="First Name">First Name:</label>
      <input type="text" id="FirstName" name="FirstName"></input>
      <label for="Last Name">Last Name:</label>
      <input type="text" id="FirstName" name="LastName"></input>
      <label for="Age">Age:</label>
      <input type="text" id="Age" age="Age"></input>

      {/* Add radio buttons for male or female */}
        <div class="container-fluid">
       <div class="row p-2 pt-3 pb-3 d-flex align-items-center">
           <div class="col-md-2">
               <img class="d-none d-md-flex" src="https://i.imgur.com/R8QhGhk.png" width="100"> </img>
           </div>
           <div class="col-md-8">
        <div class="d-flex form-inputs">
        <input class="form-control" type="text" placeholder="Search for patients"></input>
        <i class="bx bx-search"></i>
        </div>
        </div>     
        </div>           
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

  
      
        {/* Search Box */}
        <input id="searchbar"></input>
        <form name="form1" method="post" action="searchResults.php">
            <input name="Search" type="text"size="40" maxlength="50"/></form>
            <input type="submit" name="submit" value="Search"/> {/*little search button beside search input box*/}
        <div className = "patient_info">
          <div className = "personal_info">
          </div>
          <div className = "notes">
            <label htmlFor = "doctors_notes"><p>Doctors' Notes</p></label>
            <input type = "text" />
            <label htmlFor = "nurse_notes"><p>Notes for Nurse</p></label>
            <input type = "text" />
          </div>
        </div>

         {/* Insert a table with <tr> tages and grab laurels information and display it in table format */}
         {/* This table will populate the data from laurel's structure into each row using ids */}     
        <h2>Patient Information</h2>
        
        <table style="width:100%">
          <tr>
            {/* This is the columns */}
            <th>Firstname</th>
            <th>Lastname</th> 
            <th>Age</th>
            <th>Sex</th>
            <th>DOB</th>
            <th></th>
          </tr>
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
        </table>
            

           
            

            /* api to search the index for the user's inputted search bar text once search is pressed
            and then go search the database for the name and return all the patient information in a new textbox below 
            the searchbar */
            /*
          
          <hr></hr>
      <div class = 'demoButton'>
        <Button onClick = {handleShow}> 
          Edit Patient Data Demo
        </Button>
      </div>
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

export default Patient_List;

