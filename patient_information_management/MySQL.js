const mysql = require('mysql');

var username = "test_user";
var password = "passwordtest";
var database = "anotherTest";

var test_selection = "FirstName";
var test_location = "LastName";
var test_data = "Doe";

connection = null;

if (connection == null){ connection = createConnection(username, password, database); } else return;

connect(connection);
init();

/*
    So this is how we have to make calls to the functions so the data does not overwrite itself. This function won't remain here.
    It is an example that we can use later. The sleep function will be moved to its own file since it may be needed elsewhere.
*/
async function init() {
    print_table_async(connection, database, "patient_info");

    await sleep(0);
    let data = await print_specific_data_async(connection, database, "patient_info", test_selection, test_location, test_data);
    console.log(data);

    await sleep(0);
    data = await search_for_data_async(connection, database, "patient_info", test_selection, test_location, test_data);
    console.log(data);

    await sleep(0);
    disconnect(connection);
  }
  
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

function createConnection(username, password, database)
{ 
    return mysql.createConnection({
        host: "24.42.199.116",
        user: username,
        password: password,
        database: database
    });
}

function connect(connection)
{
    connection.connect(function(err) {
//    if (err) throw err;
    console.log("Connected!");
});
}

function disconnect(connection)
{
    connection.end();
    connection.on('end', function() {
        console.log("Disconnected from MySQL Server");
    });
}

function insert_row(connection, schema, table, headers, values)
{
    query = ("INSERT INTO " + schema + "." + table + " "
             + headers + " VALUES " + values);

    connection.query(query, function (err, result, fields) {
//         if (err) throw err;
       });
}

function remove_row(connection, schema, table, location, data)
{
    query = ("DELETE FROM " + schema + "." + table + " WHERE "
             + location + " = '" + data + "'");

    connection.query(query, function (err, result, fields) {
//         if (err) throw err;
       });
}

function update_row(connection, schema, table, location, data, col_to_update, updated_info)
{
    query = ("UPDATE " + schema + "." + table + " SET " + col_to_update + " = " + updated_info 
            + " WHERE "+ location + " = '" + data + "'");

    connection.query(query, function (err, result, fields) {
//         if (err) throw err;
       });
}

async function print_table_async(connection, schema, table)  {
    let res = await print_table(connection, schema, table)
    console.log(res)
}

function print_table(connection, schema, table)
{
    query = "SELECT * FROM " + schema + "." + table;
    return new Promise(resolve => {
      setTimeout(() => {
        connection.query(query, function (err, result) {
//            if (err) throw err;
            resolve(result);
            });
      }, 0);
    });
}

async function print_specific_data_async(connection, schema, table, selection, location, data)  {
    let res = await print_specific_data(connection, schema, table, selection, location, data);
    return res;
}

// Design Idea: Use this as a "private" method. We can have other functions that will
// call this. i.e., get_patient_info_for_doctor could call this with specific info that
// only the doctor can see
function print_specific_data(connection, schema, table, selection, location, data)
{
    query = ("SELECT " + selection + " FROM " + schema + "." + table 
             + " WHERE " + location + " = " +  "'" + data +  "'");

    return new Promise(resolve => {
      setTimeout(() => {
        connection.query(query, function (err, result) {
//            if (err) throw err;
            resolve(result);
       });
      }, 0);
    });
}

async function search_for_data_async(connection, schema, table, selection, location, data)  {
    let res = await search_for_data(connection, schema, table, selection, location, data)
    return res;
}

function search_for_data(connection, schema, table, selection, location, data)
{
    query = ("SELECT " + selection + " FROM " + schema + "." + table 
             + " WHERE " + location + " LIKE " +  "'" + data +  "%'");

    return new Promise(resolve => {
      setTimeout(() => {
        connection.query(query, function (err, result) {
//            if (err) throw err;
            resolve(result);
       });
      }, 0);

    });
}