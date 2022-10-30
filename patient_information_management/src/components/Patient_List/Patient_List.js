import React, {useState} from 'react';
import './Patient_List.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Patient_List() {
    const [show, setShow] = useState(false);
    const handleCancel = () => setShow(false);

    const handleShow = () => {
      // get patient data from MySQL and display it here
      setShow(true);
    }

    const handleSaveChanges = () => {
      // Send updated changes to mySQL database here
      setShow(false);
    }

    return (
      <>
      <Button onClick = {handleShow}> 
        Individual Patient Modal - must take in data from MySQL
      </Button>

      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Modal time</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSaveChanges}>
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
          </section>
      </>
    );
};
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
