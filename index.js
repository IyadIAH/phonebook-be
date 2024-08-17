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
// /api/persons return persons

app.get('/api/persons', (request, response) => {
    response.json(persons)
})



//Define port and listener
const PORT = 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})