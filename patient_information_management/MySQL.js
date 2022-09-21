const mysql = require('mysql');

var username = "test_user";
var password = "passwordtest";
var database = "anotherTest";

connection = null;

if (connection == null){ connection = createConnection(username, password, database); } else return;

connect(connection);
disconnect(connection);

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
    if (err) throw err;
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
         if (err) throw err;
       });
}

function remove_row(connection, schema, table, location, data)
{
    query = ("DELETE FROM " + schema + "." + table + " WHERE "
             + location + " = '" + data + "'");

    connection.query(query, function (err, result, fields) {
         if (err) throw err;
       });
}

function update_row(connection, schema, table, location, data, col_to_update, updated_info)
{
    query = ("UPDATE " + schema + "." + table + " SET " + col_to_update + " = " + updated_info 
            + " WHERE "+ location + " = '" + data + "'");

    connection.query(query, function (err, result, fields) {
         if (err) throw err;
       });
}

function print_table(connection, schema, table)
{
    query = "SELECT * FROM " + schema + "." + table;
    connection.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
}

// Design Idea: Use this as a "private" method. We can have other functions that will
// call this. i.e., get_patient_info_for_doctor could call this with specific info that
// only the doctor can see
function print_specific_data(connection, schema, table, selection, location, data)
{
    query = ("SELECT " + selection + " FROM " + schema + "." + table 
             + " WHERE " + location + " = " +  "'" + data +  "'");

    connection.query(query, function (err, result, fields) {
         if (err) throw err;
         console.log(result);

         // Way to print out data without "RowDataPacket"
        // console.log(result[0].LastName);
       });
}

function search_for_data(connection, schema, table, selection, location, data)
{
    query = ("SELECT " + selection + " FROM " + schema + "." + table 
             + " WHERE " + location + " LIKE " +  "'" + data +  "%'");

    connection.query(query, function (err, result, fields) {
         if (err) throw err;
         console.log(result);
       });
}
