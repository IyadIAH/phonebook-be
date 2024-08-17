const express = require('express')
const app = express()

// Initialize Data
const persons = [
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

    response.json(person)
})


//Define port and listener
const PORT = 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})