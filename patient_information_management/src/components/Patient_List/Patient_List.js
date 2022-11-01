import React, {useEffect, useState} from 'react';
import './Patient_List.css';
import Button from 'react-bootstrap/cjs/Button.js';
import Modal from 'react-bootstrap/cjs/Modal.js';
import Col from 'react-bootstrap/cjs/Col.js';
import Form from 'react-bootstrap/cjs/Form.js';
import Row from 'react-bootstrap/cjs/Row.js';


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
      setPerson({firstName: 'John', lastName: 'Smith', address: '601 John Wright Dr', city: 'Huntsville'}) // Replace this with mysql call to the correct person from the search
      setShow(true);
    }

    const handleSubmitChanges = (event) => {
      setShow(false);
      const form = event.currentTarget;
      
    }

    return (
      <>
      <Button onClick = {handleShow}> 
        Individual Patient Modal - must take in data from MySQL
      </Button>

      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
            <Modal.Title>Edit {person.firstName} {person.lastName}'s information </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  First Name
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" placeholder={person.firstName} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Last Name
                </Form.Label>
                <Col>
                  <Form.Control type="text" placeholder={person.lastName} />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitChanges}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Modal.Footer>
      </Modal>

          <section>

            <input id="searchbar"></input>
            

            /* api to search the index for the user's inputted search bar text once search is pressed
            and then go search the database for the name and return all the patient information in a new textbox below 
            the searchbar */
            /*
          </section>
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

