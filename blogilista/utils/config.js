require('dotenv').config()

let MONGOURI = process.env.MONGOURI
let PORT = process.env.PORT

module.exports = {
    MONGOURI,
    PORT
}