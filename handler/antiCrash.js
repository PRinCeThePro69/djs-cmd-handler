const client = require("../index");

module.exports = (client) => {
    process.on('unhandledRejection', (reason , p) => {
        console.log('Unhandled Rejection Err:')
        console.log(reason, p)
    })
    process.on('uncaughtException', (err , origin) => {
        console.log('Uncaught Exception Err:')
        console.log(err , origin)
    })
    process.on('uncaughtExceptionMonitor', (err , origin) => {
        console.log('Uncaught Exception Err:')
        console.log(err , origin)
    })
    process.on('multipleResolves', (type, promise, reason) => {
        console.log('Multiple Resolves Err:')
        console.log(type, promise, reason)
    })
    client.on('error', (err) => {
        console.log('Discord ERR')
        console.log(err)
    })
}