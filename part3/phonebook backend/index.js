require('./mongo.js')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const notFound = require ('./middleware/notFound.js')
const handleError = require ('./middleware/handleError.js')
const validateNumber = require('./middleware/validateNumber.js')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

app.get('/', (req, res) => {
  res.send('<h1>hello</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

morgan.token('postData', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  } else {
    return '';
  }
});

app.get('/info', (req, res) => {
  Person.countDocuments({}).then(count => {
    const currentDate = new Date();
    res.send(`<p>Phonebook has info for ${count} people</p></br><p>${currentDate}</p>`);
  }).catch(error => {
    res.status(500).send({ error: 'Something went wrong' });
  });
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params

  Person.findById(id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).send('<img src="https://http.cat/404" alt="Not Found">')
    }
  }).catch(error => {
    console.log(error)
    res.status(503).end()
  })
})

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;
  console.log(`DELETE Request ID: ${id}`);
  if (!number) {
    return res.status(400).json({ error: 'number is missing' });
  }

  const personUpdate = { name, number };

  Person.findByIdAndUpdate(id, personUpdate, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: 'person not found' });
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(`DELETE Request ID: ${id}`);
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((e) => {
      next(e);
    });
});

app.post('/api/persons', validateNumber, (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number are missing'
    })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

// manejo de errores (middlewares):
app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});