const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    if (req.method === 'POST') {
        return [
            tokens.method(req, res),
            tokens.url(req, res), 
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    } else {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'] (req, res), 'ms'
        ].join(' ')
    }
}))

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

// /api/info route to return time of request and how many pieces of information
app.get('/api/info', (request, response) => {
    const date = new Date()
    const message = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
    response.send(message)
})

//retrieve persons from /api/persons
app.get('/api/persons', (request,response) => {
    response.json(persons)
})

// Retrieving a single entry by id
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

//Deleting a single entry by id
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// Adding persons funcionality
app.post('/api/persons', (request, response) => {
    const generateId = () =>  Math.floor(Math.random() * 3000)
    const existingNames = persons.map(person => person.name)
    const body = request.body
// Handle insert errors
    if (!body.name) {
        return response.status(400).json({
            error: 'Name is missing'
        })
    }
    
    if (!body.number) {
        return response.status(400).json({
            error: 'Number is missing'
        })
    }

    if (existingNames.includes(body.name)) {
        return response.status(400).json({
            error: "Name must be unique"
        })
    }
// Create new Entry
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})