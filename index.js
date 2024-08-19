require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(express.json())
// Morgan Middleware
const morgan = require('morgan')
const person = require('./models/person')
morgan.token('postData', function getPost (req) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return null
    }   
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

// Initialize Data
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {return String(Math.floor(Math.random() * 2500))}

//Define Routes

// /api/info return info and date
app.get('/info', (request, response) => {
    const date = new Date()
    const number = Person.find({}).then(results => { const message = `<p>Phonebook has info for ${results.length} people. <br /> ${date}</p>`
    
        response.send(message) })

})

// /api/persons return persons
app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(people => {
            response.json(people)
        })
        .catch(error => next(error))
})

// /api/persons/id return entry
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

// implement delete entry
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// implement adding an entry
app.post('/api/persons/', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: !body.name ? 'name is missing' : 'number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
    )
        .then(returnedPerson => {
            response.json(returnedPerson)
        })
        .catch(error => next(error))
}) 

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed if'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message})
    }
    next(error)
}
app.use(errorHandler)

//Define port and listener
const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})