var mysql = require('mysql');

var username = "root";
var password = "PIMS";
var database = "test_database";
var schema = "test_schema";
var table = "test_table";

connection = null;

if (connection == null){ connection = createConnection(username, password, database); } else return;

connect(connection);
print_table(connection, schema, table);
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

function connect(con)
{
    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
}

function disconnect(con)
{
    con.end();
    con.on('end', function() {
        console.log("Disconnected from MySQL Server");
    })
}

function print_table(con, schema, table)
{
    query = "SELECT * FROM " + schema + "." + table;
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
}