/*
Authors: Timothy Hagler, Sydney Keller, Ben Stone, Laurel Strelzoff
CS 499-01
Senior Design Final Deliverable
Professor Adam Colwell
Fall 2022
*/

import { createConnection as __createConnection } from "mysql";

/*
This function initializes the connection to the database.
*/
function createConnection(username, password, database) {
  return __createConnection({
    host: "24.42.199.116",
    user: username,
    password: password,
    database: database,
  });
}

/*
This function connects the user based on the connection created in createConnection
*/
function connect(connection) {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
}

const _createConnection = createConnection;
export { _createConnection as createConnection };

const _connect = connect;
export { _connect as connect };
