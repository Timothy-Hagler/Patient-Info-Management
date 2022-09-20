import React from 'react';
import './Patient_Information.css';

export default function Patient_Information() {
  return(
    <section>
      <h1>Patient Information</h1>
        <div class = "patient_info">
          <div class = "personal_info">

          </div>
          <div class = "notes">
            <label for = "doctors_notes"><p>Doctors' Notes</p></label>
            <input type = "text" />

            <label for = "nurse_notes"><p>Notes for Nurse</p></label>
            <input type = "text" />
          </div>

        </div>
    </section>
  );
}
