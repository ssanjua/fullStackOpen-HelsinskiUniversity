const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
]

app.get('/', (req, res) => {
  res.send('<h1>hello</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const currentDate = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p></br><p>${currentDate}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(persons => persons.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).send('<img src="https://http.cat/404" alt="Not Found">')
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

morgan.token('postData', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  } else {
    return '';
  }
});

app.post('/api/persons', (req, res) => {
  const body = req.body
  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number are missing'
    })
  }

  const nameExists = persons.find(person => person.name === body.name)
  console.log(nameExists)
  if (nameExists) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  
  persons = persons.concat(newPerson)
  res.json(persons)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`running ${PORT}`)
})