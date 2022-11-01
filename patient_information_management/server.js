import express from 'express';
import cors from 'cors'
import { createConnection, connect, disconnect } from './MySQL.js';

const app = express();

app.use(cors());

app.use('/', (req, res) => {

    res.send({
  
      token: 'test123'
  
    });
  
  });

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

let connection = createConnection("test_user", "passwordtest", "anotherTest")
//console.log(connection)
connect(connection)
console.log("Connection is")
console.log(connection)
disconnect(connection)