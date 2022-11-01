import express from 'express';
import cors from 'cors'
import { createConnection, connect, disconnect, search_for_data_async } from './MySQL.js';

const app = express();

app.use(cors());
app.use(express.json())

let connection = createConnection("test_user", "passwordtest", "anotherTest")
connect(connection)

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

app.post('/api/updateData', (req, res) => {

    const schema = req.body.schema;
    const table = req.body.table;
    const col_to_update = req.body.col_to_update;
    const updated_info = req.body.updated_info;
    const location = req.body.location;
    const data = req.body.data;

    let query = ("UPDATE " + schema + "." + table + " SET " + col_to_update + " = " + updated_info 
            + " WHERE "+ location + " = '" + data + "'");

    connection.query(query, function (err, result, fields) {
        if (err) throw err;
      });
  
  });

app.get('/api/get', (req, res) => {

    //let data = search_for_data_async(connection, "PIMS", "Patients", "*", "*", "*");
    res.send({
  
      token: 'test123',
      //info: data,
      testData2: "i am some test data"
    });
  
  });


app.use("/api/test", (req,res)=>{
  console.log("I AM THE SERVER")
  //print_table_async(connection, "PIMS", "Patients");
  let data = search_for_data_async(connection, "PIMS", "Patients", "LastName", "LastName", "Smith");
  connection.query("SELECT * FROM " + "PIMS" + "." + "Patients", (err,result)=>{
      if(err) {
      console.log(err)
      console.log("THERE WAS AN ERROR")
      //throw err;
      } 
  res.send({res: result, dat: data})
    });    });


app.use("/", (req,res)=>{

});
//console.log(connection)
//connect(connection)
console.log("Connection is")
//console.log(connection)
//print_table_async(connection, "PIMS", "Patients");
//disconnect(connection)
