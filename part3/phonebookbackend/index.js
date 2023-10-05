const express = require("express");
const app = express();

app.use(express.json());

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
  response.json(phonebook);
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
  const personData = phonebook.find((person) => person.id === req);
  personData ? response.json(personData) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const reqID = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== req);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const postData = request.body;
  if (!postData) {
    return response.status(400).json({
      error: "content missing",
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
