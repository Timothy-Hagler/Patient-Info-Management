/*
Authors: Timothy Hagler, Sydney Keller, Ben Stone, Laurel Strelzoff
CS 499-01
Senior Design Final Deliverable
Professor Adam Colwell
Fall 2022
*/

import express from 'express';
import cors from 'cors'
import { createConnection, connect} from './MySQL.js';

// Sets up express
const app = express();
app.use(cors());
app.use(express.json())

// Initializes connection using code in MySQL.js
let connection = createConnection("admindb", "password", "PIMS") // format: username, password, schema
connect(connection)

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

// Update the specified data in the database
app.post('/api/updateData', (req, res) => {

  // collect parameters from the API call
  const schema = req.body.schema;
  const table = req.body.table;
  const cols_to_update = req.body.cols_to_update;
  const updated_info = req.body.updated_info;
  const location = req.body.location;
  const data = req.body.data;

  let info = ``

  // go through each updated column and append the string with the header and the new value
  for (let i = 0; i < cols_to_update.length; i++) {
    info = info + `${cols_to_update[i]}='${updated_info[cols_to_update[i]]}'`

    // add a comma if there are more values to be added
    if (i + 1 < cols_to_update.length)
    {
      info = info + `,`
    }
  }

  let query = ("UPDATE " + schema + "." + table + " SET " + info 
          + " WHERE "+ location + " = '" + data + "'");

  // query the API
  connection.query(query, function (err, result, fields) {
      if (err) throw err;
    });
  
});

// Insert a row into the database
app.post('/api/insertRow', (req, res) => {

  // collect parameters from the API call
  const schema = req.body.schema;
  const table = req.body.table;
  const headers = req.body.headers;
  const values = req.body.values;

  let query = ("INSERT INTO " + schema + "." + table + " ("
            + headers + ") VALUES (" + values + ")");

  // query the API
  connection.query(query, function (err, result, fields) {
    if(err) {
      console.log(err)
    }
  });

});

// Remove a row from the database
app.post('/api/removeRow', (req, res) => {

  // collect parameters from the API call
  const schema = req.body.schema;
  const table = req.body.table;
  const location = req.body.location;
  const data = req.body.data;

  let query = ("DELETE FROM " + schema + "." + table + " WHERE "
            + location + " = '" + data + "'");

  // update the sql safe updates to ensure proper deletion
  connection.query("SET SQL_SAFE_UPDATES = 0");
 
  // query the database
  connection.query(query, function (err, result, fields) {
      if (err) throw err;
    });

});

// Search for data in the database
app.get('/api/searchData/', (req, res) => {

    // collect parameters from the API call
    const selection = req.query.selection;
    const schema = req.query.schema;
    const table = req.query.table;
    let locations = req.query.locations;
    let data = req.query.data;

    // split the locations and data into lists
    locations = locations.split(',')
    data = data.split(',')

    let query = ("SELECT " + selection + " FROM " + schema + "." + table 
             + " WHERE " + locations[0] + " LIKE '" + data[0] +  "%'"
             + "AND " + locations[1] + " LIKE '" + data[1] + "%'"
             + "AND " + locations[2] + " LIKE '" + data[2] + "%'");

    // query the API and send the results
    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});

// Get the highest person ID in the database
app.get('/api/getHighestPersonID/', (req, res) => {

    // collect parameters from the API call
    const schema = req.query.schema;
    const table = req.query.table;

    let query = ("SELECT MAX(personID) FROM " + schema + "." + table);

    // query the API and send the result
    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});

// Get specific information about a patient
app.get('/api/getPatientInformation/', (req, res) => {

    // collect parameters from the API call
    const selection = req.query.selection;
    const schema = req.query.schema;
    const table = req.query.table;
    const location = req.query.location;
    const data = req.query.data;

    let query = ("SELECT " + selection + " FROM " + schema + "." + table
             + " WHERE " + location + " = '" + data + "'");

    // query the API and send the result
    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});

// Get entire patient table
app.get('/api/getFullPatientTable/', (req, res) => {

    let query = "SELECT * FROM PIMS.Patients"

    // query the API and send the result
    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});

// Get username and Password for Login
app.get('/api/getUsernameAndPassword/', (req, res) => {

    // collect parameters from the API call
    const selection = req.query.selection;
    const schema = req.query.schema;
    const table = req.query.table;
    const location = req.query.location;
    const data = req.query.data;

    let query = ("SELECT " + selection + " FROM " + schema + "." + table
            + " WHERE " + location + " = '" + data + "'");

  // query the API. Try block in case incorrect username
  try{
    connection.query(query, (err,result)=>{
      res.send(result)
    });
  }
  catch (error)
  {
    if (error instanceof TypeError){
      console.log("wrong");
    }
  }
});
