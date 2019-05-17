require('dotenv').config()

let MONGOURI = process.env.MONGOURI

if (process.env.NODE_ENV === 'test'){
    MONGOURI = process.env.MONGOURI_TEST
  }
  
let PORT = process.env.PORT

module.exports = {
    MONGOURI,
    PORT
}