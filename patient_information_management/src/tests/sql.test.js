const sql = require('../../MySQL')

test("Create valid connection to server",() => {
    let connection = sql.createConnection("test_user", "passwordtest", "anotherTest")
    expect(connection).not.toBeNull()
})

test("Connect to Server Successfully",() => {
    let connection = sql.createConnection("test_user", "passwordtest", "anotherTest")
    expect(() => {
        sql.connect(connection)
    }).not.toThrow()
})

test("Disconnect from Server Successfully",() => {
    let connection = sql.createConnection("test_user", "passwordtest", "anotherTest")
    sql.connect(connection)

    expect(() => {
        sql.disconnect(connection)
    }).not.toThrow()
})