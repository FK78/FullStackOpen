const express = require("express");
const app = express();

const phonebook = [
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

app.get('/api/persons/:id', (request, response) => {
    const req = Number(request.params.id)
    const personData = phonebook.find((person) => person.id === req)
    personData ? response.json(personData) : response.status(404).end()
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
