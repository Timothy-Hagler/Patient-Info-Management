import { createConnection, connect, disconnect } from '../../MySQL.js';

test("Create valid connection to server",() => {
    let connection = createConnection("test_user", "passwordtest", "anotherTest")
    expect(connection).not.toBeNull()
    disconnect(connection)
})

test("Connect to Server Successfully",() => {
    let connection = createConnection("test_user", "passwordtest", "anotherTest")
    expect(() => {
        connect(connection)
    }).not.toThrow()
    disconnect(connection)
})

test("Disconnect from Server Successfully",() => {
    let connection = createConnection("test_user", "passwordtest", "anotherTest")
    connect(connection)

    expect(() => {
        disconnect(connection)
    }).not.toThrow()
})