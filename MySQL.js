const mysql = require('mysql');

var username = "root";
var password = "PIMS";
var database = "test_database";
var schema = "test_schema";
var table = "test_table";

var test_selection = "FirstName";
var test_location = "LastName";
var test_data = "Hagler";

connection = null;

if (connection == null){ connection = createConnection(username, password, database); } else return;

connect(connection);

print_table(connection, schema, table);
print_specific_data(connection, schema, table, test_selection, test_location, test_data);

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
    })
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
