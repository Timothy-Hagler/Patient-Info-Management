var mysql = require('mysql');

var username = "defaultUser";
var password = "defaultPass";
connection = null;

if (connection == null){ connection = createConnection(username, password); } else return;

connect(connection);
disconnect(connection);

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