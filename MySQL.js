const mysql = require('mysql');

var username = "root";
var password = "PIMS";
var database = "test_database";
var schema = "test_schema";
var table = "test_table";

var test_selection = "LastName";
var test_location = "FirstName";
var test_full_data = "John";
var test_partial_data = "Tim";

var test_insert_headers = "(CurrDate, FirstName, LastName)"
var test_insert_values = "('08/30/2022', 'John', 'Doe')"

connection = null;

if (connection == null){ connection = createConnection(username, password, database); } else return;

connect(connection);

insert_row(connection, schema, table, test_insert_headers, test_insert_values);
print_table(connection, schema, table);
remove_row(connection, schema, table, test_location, test_full_data);
print_table(connection, schema, table);

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
         console.log(result);
       });
}

function remove_row(connection, schema, table, location, data)
{
    query = ("DELETE FROM " + schema + "." + table + " WHERE "
             + location + " = '" + data + "'");

    connection.query(query, function (err, result, fields) {
         if (err) throw err;
         console.log(result);
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
