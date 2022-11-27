import './Error_Page.css';
import React, { Component }  from 'react';

const Error_Page = () => {

  return (<>
  <div id="errorMessage">
  <h3>NOT CONNECTED TO INTRANET</h3>
  <br></br>
  <h4>Ensure you are connected to the intratnet via the PulseSecure VPN</h4>
  </div>
  </>)
}

export default Error_Page;