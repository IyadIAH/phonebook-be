const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://iyadhmidat:${password}@fullstack.071t46g.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Fullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

const phone = new Phone({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length < 4) {
    Phone.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(phone => {
         console.log(`${phone.name} ${phone.number}`) 
        })
        mongoose.connection.close()
      })
} else {
    phone.save().then(result => {
        const message = `Added ${process.argv[3]} number ${process.argv[4]} to the phonebook`
        console.log(message)
        mongoose.connection.close()
      })
}


