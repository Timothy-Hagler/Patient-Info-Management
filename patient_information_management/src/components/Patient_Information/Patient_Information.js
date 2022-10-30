import React from 'react';
import './Patient_Information.css';
import {Link} from 'react-router-dom';

export default function Patient_Information() {
  return(
    <section>
      <h1>Patient Information</h1>
      <div class = 'links'>
         {/*   <li><Link to="/">Login</Link></li>
            <li><Link to="/patient-list">Patient List</Link></li> */}
            </div>
            <h1>Patient Information</h1>
            
        {/* Search Box */}
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
    </section>
  );
}
