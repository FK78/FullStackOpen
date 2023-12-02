require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Number = require('./models/number')

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/api/persons', (request, response) => {
  Number.find({}).then((numbers) => {
    response.json(numbers)
  })
})

app.get('/info', async (request, response) => {
  const numberOfPersons = await Number.collection.countDocuments()
  const currentDateAndTime = new Date()
  response.send(
    `<p>Phonebook has info for ${numberOfPersons} people</p>
     <p>${currentDateAndTime}</p>`
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  Number.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Number.findByIdAndDelete(request.params.id).then((number) => {
    response.json(number)
  })
})

app.post('/api/persons', (request, response, next) => {
  const postData = request.body
  if (!postData) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  if (!postData.name || !postData.number) {
    return response.status(400).json({
      error: 'name or number is missing',
    })
  }

  const record = new Number({
    name: postData.name,
    number: postData.number,
  })

  record
    .save()
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number, content } = request.body

  if (!content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number is missing',
    })
  }

  Number.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedContact) => {
      response.json(updatedContact)
    })
    .catch((error) => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})