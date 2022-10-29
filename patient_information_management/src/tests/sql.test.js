const sql = require('../../MySQL')

test("Create valid connection to server",() => {
    let connection = sql.createConnection("test_user", "passwordtest", "anotherTest")
    expect(connection).not.toBeNull()
    sql.disconnect(connection)
})

test("Connect to Server Successfully",() => {
    let connection = sql.createConnection("test_user", "passwordtest", "anotherTest")
    expect(() => {
        sql.connect(connection)
    }).not.toThrow()
    sql.disconnect(connection)
})

test("Disconnect from Server Successfully",() => {
    let connection = sql.createConnection("test_user", "passwordtest", "anotherTest")
    sql.connect(connection)

    expect(() => {
        sql.disconnect(connection)
    }).not.toThrow()
})