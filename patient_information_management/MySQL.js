import { createConnection as __createConnection } from 'mysql';

function createConnection(username, password)
{ 
    return __createConnection({
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
    let query = "SELECT * FROM " + table;
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
}

const _createConnection = createConnection;
export { _createConnection as createConnection };
const _connect = connect;
export { _connect as connect };
const _disconnect = disconnect;
export { _disconnect as disconnect };