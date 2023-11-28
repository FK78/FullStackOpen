require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Number = require('./models/number')

app.use(express.static('dist'))
app.use(cors());
app.use(express.json());

morgan.token("body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  Number.find({}).then((numbers) => {
    response.json(numbers)
  })
});

app.get("/info", (request, response) => {
  const numberOfPersons = phonebook.length;
  const currentDateAndTime = new Date();
  response.send(
    `<p>Phonebook has info for ${numberOfPersons} people</p>
     <p>${currentDateAndTime}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const reqID = Number(request.params.id);
  const personData = phonebook.find((person) => person.id === reqID);
  personData ? response.json(personData) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const reqID = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== reqID);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const postData = request.body;
  if (!postData) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!postData.name || !postData.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const findExistingName = phonebook.find(
    (p) => p.name.toLowerCase() === postData.name.toLowerCase()
  );
  if (findExistingName) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: postData.name,
    number: postData.number,
  };

  phonebook = phonebook.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
