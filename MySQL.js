const mysql = require('mysql');

var username = "root";
var password = "PIMS";
var database = "test_database";
var schema = "test_schema";
var table = "patient_info";

var test_selection = "LastName";
var test_location = "FirstName";
var test_full_data = "John";
var test_partial_data = "Tim";

var test_insert_headers = "(MobilePhone, FirstName, LastName)"
var test_insert_values = "('123-456-7890', 'John', 'Doe')"

connection = null;

if (connection == null){ connection = createConnection(username, password, database); } else return;

connect(connection);

//insert_row(connection, schema, table, test_insert_headers, test_insert_values);
update_row(connection, schema, table, test_location, test_full_data, "Location", "'Huntsville'");
print_table(connection, schema, table);
//remove_row(connection, schema, table, test_location, test_full_data);
//print_table(connection, schema, table);

print_specific_data(connection, schema, table, test_selection, test_location, test_full_data);
search_for_data(connection, schema, table, test_selection, test_location, test_partial_data);

disconnect(connection);

function createConnection(username, password, database)
{ 
    return mysql.createConnection({
        host: "localhost",
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
