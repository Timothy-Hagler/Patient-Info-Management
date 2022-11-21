import express from 'express';
import cors from 'cors'
import { createConnection, connect, disconnect } from './MySQL.js';

const app = express();

app.use(cors());
app.use(express.json())

let connection = createConnection("test_user", "passwordtest", "anotherTest")
connect(connection)

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

app.use('/api/login', (req, res) => {

  res.send({

    token: 'test123'

  });

});

app.post('/api/updateData', (req, res) => {

    const schema = req.body.schema;
    const table = req.body.table;
    const cols_to_update = req.body.cols_to_update;
    const updated_info = req.body.updated_info;
    const location = req.body.location;
    const data = req.body.data;

    let info = ``

    for (let i = 0; i < cols_to_update.length; i++)
    {
      info = info + `${cols_to_update[i]}='${updated_info[cols_to_update[i]]}'`

      if (i + 1 < cols_to_update.length)
      {
        info = info + `,`
      }
    }

    let query = ("UPDATE " + schema + "." + table + " SET " + info 
            + " WHERE "+ location + " = '" + data + "'");

    connection.query(query, function (err, result, fields) {
        if (err) throw err;
      });
  
  });

app.post('/api/insertRow', (req, res) => {

    const schema = req.body.schema;
    const table = req.body.table;
    const headers = req.body.headers;
    const values = req.body.values;

    let query = ("INSERT INTO " + schema + "." + table + " ("
             + headers + ") VALUES (" + values + ")");

    connection.query(query, function (err, result, fields) {
      if(err) {
        console.log(err)
      }
    });

  });

app.post('/api/removeRow', (req, res) => {

    const schema = req.body.schema;
    const table = req.body.table;
    const location = req.body.location;
    const data = req.body.data;

    let query = ("DELETE FROM " + schema + "." + table + " WHERE "
             + location + " = '" + data + "'");

    connection.query("SET SQL_SAFE_UPDATES = 0");
    connection.query(query, function (err, result, fields) {
        if (err) throw err;
      });

  });

app.get('/api/searchData/', (req, res) => {

    const selection = req.query.selection;
    const schema = req.query.schema;
    const table = req.query.table;
    let locations = req.query.locations;
    let data = req.query.data;

    locations = locations.split(',')
    data = data.split(',')

    let query = ("SELECT " + selection + " FROM " + schema + "." + table 
             + " WHERE " + locations[0] + " LIKE '" + data[0] +  "%'"
             + "AND " + locations[1] + " LIKE '" + data[1] + "%'"
             + "AND " + locations[2] + " LIKE '" + data[2] + "%'");

    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});

app.get('/api/getHighestPersonID/', (req, res) => {

    const schema = req.query.schema;
    const table = req.query.table;

    let query = ("SELECT MAX(personID) FROM " + schema + "." + table);

    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});

app.get('/api/getPatientInformation/', (req, res) => {

    const selection = req.query.selection;
    const schema = req.query.schema;
    const table = req.query.table;
    const location = req.query.location;
    const data = req.query.data;

    let query = ("SELECT " + selection + " FROM " + schema + "." + table
             + " WHERE " + location + " = '" + data + "'");

    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});


app.get('/api/getFullPatientTable/', (req, res) => {

    let query = "SELECT * FROM PIMS.Patients"

    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});


app.get('/api/getPatientInformation/', (req, res) => {

    const selection = req.query.selection;
    const schema = req.query.schema;
    const table = req.query.table;
    const location = req.query.location;
    const data = req.query.data;

    let query = ("SELECT " + selection + " FROM " + schema + "." + table
             + " WHERE " + location + " = '" + data + "'");

    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});


app.get('/api/getPatientInformation/', (req, res) => {

    const selection = req.query.selection;
    const schema = req.query.schema;
    const table = req.query.table;
    const location = req.query.location;
    const data = req.query.data;

    let query = ("SELECT " + selection + " FROM " + schema + "." + table
             + " WHERE " + location + " = '" + data + "'");

    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});

app.get('/api/patientList/', (req, res) => {

    let query = "SELECT * FROM PIMS.Patients"

    connection.query(query, (err,result)=>{
      if(err) {
        console.log(err)
      }
      res.send(result)
  });
});

//Username and Password for Login
app.get('/api/getUsernameAndPassword/', (req, res) => {

  const selection = req.query.selection;
  const schema = req.query.schema;
  const table = req.query.table;
  const location = req.query.location;
  const data = req.query.data;

  let query = ("SELECT " + selection + " FROM " + schema + "." + table
           + " WHERE " + location + " = '" + data + "'");

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
