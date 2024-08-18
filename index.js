const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(express.json())
// Morgan Middleware
const morgan = require('morgan')
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
    const message = `<p>Phonebook has info for ${persons.length} people <br /> ${date}`

    response.send(message)
})

// /api/persons return persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// /api/persons/id return entry
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end
    }
})

// implement delete entry
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
    
})

// implement adding an entry
app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: !body.name ? 'name is missing' : 'number is missing'
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: `${body.name} already exists in Phonebook`
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

//Define port and listener
const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})