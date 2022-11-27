import { createConnection as __createConnection } from 'mysql';

function createConnection(username, password, database)
{ 
    return __createConnection({
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

const _createConnection = createConnection;
export { _createConnection as createConnection };
const _connect = connect;
export { _connect as connect };
const _disconnect = disconnect;
export { _disconnect as disconnect };
