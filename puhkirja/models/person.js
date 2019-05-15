const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)


const url = process.env.MONGOURL
console.log('connecting to ', url)

mongoose.connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log("connected to MongoDB")
    })

const personSchema = new mongoose.Schema({
        name: {
            type: String,
        },
        number: {
            type: String
        }
})


personSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
})

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)