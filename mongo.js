const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://iyadhmidat:${password}@fullstack.071t46g.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Fullstack`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
    Person.find({})
        .then(results => {
            console.log('Phonebook: ')
            results.forEach(result => {
                console.log(`${result.name} ${result.number}`)
                mongoose.connection.close()
            })
        })
    
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save()
        .then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            mongoose.connection.close()
        })
}

