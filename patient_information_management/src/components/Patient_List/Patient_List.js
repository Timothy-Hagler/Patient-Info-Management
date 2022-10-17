import React from 'react';
import './Patient_List.css';

function Patient_List() {

 

    return(
  
          <section>

          
            <input id="searchbar"></input>
            
            /* api to search the index for the user's inputted search bar text once search is pressed
            and then go search the database for the name and return all the patient information in a new textbox below 
            the searchbar */

          

          </section>
    )   /* end return */
  
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
