var mysql = require('mysql');

var username = "defaultUser";
var password = "defaultPass";
var database = "defaultDatabase";
var table = "defaultTable"

//connection = null;

//if (connection == null){ connection = createConnection(username, password, database); } else return;

//connect(connection);
//disconnect(connection);
// print_table(connection, table);

function createConnection(username, password)
{ 
    return mysql.createConnection({
        host: "24.42.199.116",
        user: username,
        password: password
    });
}

function connect(con)
{
    con.connect(function(err) {
    if (err) throw err;
});
}

function disconnect(con)
{
    con.end();
}

function print_table(con, table)
{
    query = "SELECT * FROM " + table;
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
}

exports.createConnection = createConnection
exports.connect = connect
exports.disconnect = disconnect