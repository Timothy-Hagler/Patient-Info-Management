var mysql = require('mysql');

var username = "defaultUser";
var password = "defaultPass";
var database = "defaultDatabase";
var table = "defaultTable"

connection = null;

if (connection == null){ connection = createConnection(username, password, database); } else return;

connect(connection);
disconnect(connection);
// print_table(connection, table);

function createConnection(username, password)
{ 
    return mysql.createConnection({
        host: "localhost",
        user: username,
        password: password
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

function print_table(con, table)
{
    query = "SELECT * FROM " + table;
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
}