import express from 'express';
import cors from 'cors'
import { createConnection, connect, disconnect, search_for_data_async } from './MySQL.js';

const app = express();

app.use(cors());
app.use(express.json())

let connection = createConnection("test_user", "passwordtest", "anotherTest")
connect(connection)

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

app.post('/api/update', (req, res) => {

   // let data = search_for_data_async(connection, "PIMS", "Patients", "*", "*", "*");
    for (let i = 0; i < 10; i++)
    {
    res.send({
  
      token: i,
   //   info: data
    });
  }
  
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
